import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faLocationDot,
  faEnvelope,
  faGlobe,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useCvStore } from '../store/cvStore';
import { useSettingsStore, SidebarKey } from '../store/settingsStore';
import EditableText from './EditableText';
import PhotoUpload from './PhotoUpload';
import CustomSection from './CustomSection';
import './Sidebar.css';

export default function Sidebar() {
  const { t } = useTranslation();
  const {
    data: { photo, name, title, contact, technologies, sectionTitles, sidebarCustom },
    setName, setTitle, setContact, setPhoto, setSectionTitle,
    setTechnology, addTechnology, removeTechnology, reorderTechnologies,
    addCustomSection, removeCustomSection, setCustomSectionField,
  } = useCvStore();
  const { visibility, sidebarOrder } = useSettingsStore();

  const dragIndex = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);

  const renderItem = (key: SidebarKey) => {
    if (!visibility[key]) return null;

    switch (key) {
      case 'photo':
        return (
          <div key="photo" className="sidebar__photo-wrapper">
            <PhotoUpload photo={photo} name={name} onUpload={setPhoto} onRemove={() => setPhoto(null)} />
          </div>
        );
      case 'name':
        return (
          <h1 key="name" className="sidebar__name">
            <EditableText value={name} onChange={setName} dark />
          </h1>
        );
      case 'title':
        return (
          <p key="title" className="sidebar__title">
            <EditableText value={title} onChange={setTitle} dark />
          </p>
        );
      case 'position':
        return (
          <div key="position" className="sidebar__contact-item">
            <FontAwesomeIcon icon={faBriefcase} className="sidebar__contact-icon" fixedWidth />
            <EditableText value={contact.position} onChange={(value) => setContact('position', value)} dark />
          </div>
        );
      case 'location':
        return (
          <div key="location" className="sidebar__contact-item">
            <FontAwesomeIcon icon={faLocationDot} className="sidebar__contact-icon" fixedWidth />
            <EditableText value={contact.location} onChange={(value) => setContact('location', value)} dark />
          </div>
        );
      case 'email':
        return (
          <div key="email" className="sidebar__contact-item">
            <FontAwesomeIcon icon={faEnvelope} className="sidebar__contact-icon" fixedWidth />
            <EditableText value={contact.email} onChange={(value) => setContact('email', value)} dark href={`mailto:${contact.email}`} fitLine />
          </div>
        );
      case 'webpage':
        return (
          <div key="webpage" className="sidebar__contact-item">
            <FontAwesomeIcon icon={faGlobe} className="sidebar__contact-icon" fixedWidth />
            <EditableText value={contact.webpage} onChange={(value) => setContact('webpage', value)} dark href={contact.webpage} hrefTarget="_blank" stripProtocol fitLine />
          </div>
        );
      case 'github':
        return (
          <div key="github" className="sidebar__contact-item">
            <FontAwesomeIcon icon={faGithub} className="sidebar__contact-icon" fixedWidth />
            <EditableText value={contact.github} onChange={(value) => setContact('github', value)} dark href={contact.github} hrefTarget="_blank" stripProtocol fitLine />
          </div>
        );
      case 'linkedin':
        return (
          <div key="linkedin" className="sidebar__contact-item">
            <FontAwesomeIcon icon={faLinkedin} className="sidebar__contact-icon" fixedWidth />
            <EditableText value={contact.linkedin} onChange={(value) => setContact('linkedin', value)} dark href={contact.linkedin} hrefTarget="_blank" stripProtocol fitLine />
          </div>
        );
      case 'technologies':
        return (
          <div key="technologies" className="sidebar__technologies">
            <div className="sidebar__divider" />
            <h2 className="sidebar__section-title">
              <EditableText value={sectionTitles.technologies} onChange={(value) => setSectionTitle('technologies', value)} dark />
            </h2>
            <ul className="sidebar__tech-list">
              {technologies.map((technology, index) => (
                <li
                  key={index}
                  className={[
                    'sidebar__tech-badge',
                    dragOver === index ? 'sidebar__tech-badge--drag-over' : '',
                    dragging === index ? 'sidebar__tech-badge--dragging' : '',
                  ].filter(Boolean).join(' ')}
                  draggable
                  onDragStart={() => { dragIndex.current = index; setDragging(index); }}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(index); }}
                  onDragLeave={() => setDragOver(null)}
                  onDrop={() => {
                    if (dragIndex.current !== null && dragIndex.current !== index) {
                      reorderTechnologies(dragIndex.current, index);
                    }
                    dragIndex.current = null;
                    setDragOver(null);
                    setDragging(null);
                  }}
                  onDragEnd={() => { dragIndex.current = null; setDragOver(null); setDragging(null); }}
                >
                  <EditableText value={technology} onChange={(value) => setTechnology(index, value)} dark onRemove={() => removeTechnology(index)} />
                </li>
              ))}
              <li>
                <button type="button" className="sidebar__tech-add" onClick={addTechnology}>
                  <FontAwesomeIcon icon={faPlus} /> {t('actions.add')}
                </button>
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="sidebar">
      {(() => {
        const contactKeys = ['position', 'location', 'email', 'webpage', 'github', 'linkedin'];
        const visibleItems = sidebarOrder
          .map((key) => ({ key, item: renderItem(key) }))
          .filter(({ item }) => item !== null);

        return visibleItems.map(({ key, item }, index) => {
          const isContact = contactKeys.includes(key);
          const previousKey = index > 0 ? visibleItems[index - 1].key : null;
          const previousIsContact = previousKey ? contactKeys.includes(previousKey) : false;
          const needsDivider = isContact && !previousIsContact && index > 0;

          return (
            <div key={key} className={isContact ? 'sidebar__contact-item-wrapper' : undefined}>
              {needsDivider && <div className="sidebar__divider" />}
              {item}
            </div>
          );
        });
      })()}

      {sidebarCustom.map((section) => (
        <div key={section.id}>
          <div className="sidebar__divider" />
          <CustomSection
            title={section.title}
            content={section.content}
            dark
            onChangeTitle={(value) => setCustomSectionField('sidebarCustom', section.id, 'title', value)}
            onChangeContent={(value) => setCustomSectionField('sidebarCustom', section.id, 'content', value)}
            onRemove={() => removeCustomSection('sidebarCustom', section.id)}
          />
        </div>
      ))}

      <button
        type="button"
        className="sidebar__add-section btn-add btn-add--small"
        onClick={() => addCustomSection('sidebarCustom')}
      >
        <FontAwesomeIcon icon={faPlus} /> {t('actions.addSection')}
      </button>
    </aside>
  );
}
