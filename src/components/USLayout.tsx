import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faGlobe, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useCvStore } from '../store/cvStore';
import { useSettingsStore } from '../store/settingsStore';
import EditableText from './EditableText';
import CustomSection from './CustomSection';
import PhotoUpload from './PhotoUpload';
import './USLayout.css';

export default function USLayout() {
  const { t } = useTranslation();
  const {
    data: {
      name, title, contact, photo, technologies, sectionTitles,
      aboutMe, experience, education, courses, mainCustom,
    },
    setName, setTitle, setContact, setPhoto, setSectionTitle,
    setAboutMeItem, addAboutMeItem, removeAboutMeItem,
    setTechnology, addTechnology, removeTechnology,
    setExperienceField, setExperienceBullet, addExperienceBullet,
    removeExperienceBullet, addExperience, removeExperience,
    setEducationField, addEducation, removeEducation,
    setCourseField, addCourse, removeCourse,
    addCustomSection, removeCustomSection, setCustomSectionField,
  } = useCvStore();
  const { visibility, mainOrder, sidebarOrder, styling } = useSettingsStore();
  const { showContactIcons } = styling;

  const allContactItems = {
    email: { icon: faEnvelope, value: contact.email, href: `mailto:${contact.email}`, stripProtocol: false },
    location: { icon: faLocationDot, value: contact.location, href: undefined, stripProtocol: false },
    position: { icon: null, value: contact.position, href: undefined, stripProtocol: false },
    webpage: { icon: faGlobe, value: contact.webpage, href: contact.webpage, stripProtocol: true },
    github: { icon: faGithub, value: contact.github, href: contact.github, stripProtocol: true },
    linkedin: { icon: faLinkedin, value: contact.linkedin, href: contact.linkedin, stripProtocol: true },
  } as const;

  type ContactKey = keyof typeof allContactItems;
  const contactKeySet = new Set<string>(['email', 'location', 'position', 'webpage', 'github', 'linkedin']);

  const visibleContact = sidebarOrder
    .filter((key): key is ContactKey => contactKeySet.has(key) && visibility[key] && !!allContactItems[key]?.value)
    .map((key) => ({ key, ...allContactItems[key] }));

  const renderSection = (key: string) => {
    if (!visibility[key as keyof typeof visibility]) return null;

    switch (key) {
      case 'aboutMe':
        return (
          <section key="aboutMe" className="us-section">
            <h2 className="us-section__title">
              <EditableText value={sectionTitles.aboutMe} onChange={(value) => setSectionTitle('aboutMe', value)} />
            </h2>
            <ul className="us-bullets">
              {aboutMe.map((item, index) => (
                <li key={index} className="us-bullets__item">
                  <EditableText
                    value={item}
                    onChange={(value) => setAboutMeItem(index, value)}
                    onRemove={() => removeAboutMeItem(index)}
                  />
                </li>
              ))}
            </ul>
            <button type="button" className="btn-add btn-add--small" onClick={addAboutMeItem}>
              <FontAwesomeIcon icon={faPlus} /> {t('actions.addPoint')}
            </button>
          </section>
        );

      case 'experience':
        return (
          <section key="experience" className="us-section">
            <h2 className="us-section__title">
              <EditableText value={sectionTitles.experience} onChange={(value) => setSectionTitle('experience', value)} />
            </h2>
            {experience.map((entry, index) => (
              <div key={index} className="us-entry">
                <div className="us-entry__header">
                  <div className="us-entry__left">
                    <span className="us-entry__role">
                      <EditableText value={entry.role} onChange={(value) => setExperienceField(index, 'role', value)} />
                    </span>
                    <span className="us-entry__company">
                      <EditableText value={entry.company} onChange={(value) => setExperienceField(index, 'company', value)} />
                    </span>
                  </div>
                  <div className="us-entry__right">
                    <span className="us-entry__period">
                      <EditableText value={entry.period} onChange={(value) => setExperienceField(index, 'period', value)} fitLine />
                    </span>
                    <span className="us-entry__location">
                      <EditableText value={entry.location} onChange={(value) => setExperienceField(index, 'location', value)} fitLine />
                    </span>
                    <button type="button" className="btn-entry-remove" onClick={() => removeExperience(index)} title={t('actions.remove')}>×</button>
                  </div>
                </div>
                <ul className="us-bullets">
                  {entry.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="us-bullets__item">
                      <EditableText
                        value={bullet}
                        onChange={(value) => setExperienceBullet(index, bulletIndex, value)}
                        onRemove={() => removeExperienceBullet(index, bulletIndex)}
                      />
                    </li>
                  ))}
                </ul>
                <button type="button" className="btn-add btn-add--small" onClick={() => addExperienceBullet(index)}>
                  <FontAwesomeIcon icon={faPlus} /> {t('actions.addBullet')}
                </button>
              </div>
            ))}
            <button type="button" className="btn-add" onClick={addExperience}>
              <FontAwesomeIcon icon={faPlus} /> {t('actions.addExperience')}
            </button>
          </section>
        );

      case 'education':
        return (
          <section key="education" className="us-section">
            <h2 className="us-section__title">
              <EditableText value={sectionTitles.education} onChange={(value) => setSectionTitle('education', value)} />
            </h2>
            {education.map((entry, index) => (
              <div key={index} className="us-entry">
                <div className="us-entry__header">
                  <div className="us-entry__left">
                    <span className="us-entry__role">
                      <EditableText value={entry.degree} onChange={(value) => setEducationField(index, 'degree', value)} />
                    </span>
                    <span className="us-entry__company">
                      <EditableText value={entry.institution} onChange={(value) => setEducationField(index, 'institution', value)} />
                    </span>
                  </div>
                  <div className="us-entry__right">
                    <span className="us-entry__period">
                      <EditableText value={entry.period} onChange={(value) => setEducationField(index, 'period', value)} fitLine />
                    </span>
                    <button type="button" className="btn-entry-remove" onClick={() => removeEducation(index)} title={t('actions.remove')}>×</button>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn-add" onClick={addEducation}>
              <FontAwesomeIcon icon={faPlus} /> {t('actions.addEducation')}
            </button>
          </section>
        );

      case 'courses':
        return (
          <section key="courses" className="us-section">
            <h2 className="us-section__title">
              <EditableText value={sectionTitles.courses} onChange={(value) => setSectionTitle('courses', value)} />
            </h2>
            {courses.map((entry, index) => (
              <div key={index} className="us-entry">
                <div className="us-entry__header">
                  <div className="us-entry__left">
                    <span className="us-entry__role">
                      <EditableText value={entry.name} onChange={(value) => setCourseField(index, 'name', value)} />
                    </span>
                    <span className="us-entry__company">
                      <EditableText value={entry.provider} onChange={(value) => setCourseField(index, 'provider', value)} />
                    </span>
                  </div>
                  <div className="us-entry__right">
                    <span className="us-entry__period">
                      <EditableText value={entry.year} onChange={(value) => setCourseField(index, 'year', value)} fitLine />
                    </span>
                    <button type="button" className="btn-entry-remove" onClick={() => removeCourse(index)} title={t('actions.remove')}>×</button>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn-add" onClick={addCourse}>
              <FontAwesomeIcon icon={faPlus} /> {t('actions.addCourse')}
            </button>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="us-layout">
      <header className="us-header">
        {visibility.photo && (
          <div className="us-header__photo">
            <PhotoUpload photo={photo} name={name} onUpload={setPhoto} onRemove={() => setPhoto(null)} />
          </div>
        )}
        <h1 className="us-header__name">
          <EditableText value={name} onChange={setName} />
        </h1>
        {visibility.title && (
          <p className="us-header__title">
            <EditableText value={title} onChange={setTitle} />
          </p>
        )}
        {visibleContact.length > 0 && (
          <div className="us-header__contact">
            {visibleContact.map((item, index) => (
              <span key={item.key} className="us-header__contact-item">
                {index > 0 && <span className="us-header__contact-sep">·</span>}
                {showContactIcons && item.icon && <FontAwesomeIcon icon={item.icon} className="us-header__contact-icon" />}
                <EditableText
                  value={item.value}
                  onChange={(value) => setContact(item.key as Parameters<typeof setContact>[0], value)}
                  href={item.href}
                  hrefTarget={item.key !== 'email' && item.key !== 'location' && item.key !== 'position' ? '_blank' : undefined}
                  stripProtocol={item.stripProtocol}
                  fitLine
                />
              </span>
            ))}
          </div>
        )}
      </header>

      <main className="us-main">
        {mainOrder.map((key) => renderSection(key))}

        {visibility.technologies && (
          <section className="us-section">
            <h2 className="us-section__title">
              <EditableText value={sectionTitles.technologies} onChange={(value) => setSectionTitle('technologies', value)} />
            </h2>
            <div className="us-tech-list">
              {technologies.map((technology, index) => (
                <span key={index} className="us-tech-badge">
                  <EditableText value={technology} onChange={(value) => setTechnology(index, value)} onRemove={() => removeTechnology(index)} />
                </span>
              ))}
              <button type="button" className="btn-add btn-add--small" onClick={addTechnology}>
                <FontAwesomeIcon icon={faPlus} /> {t('actions.add')}
              </button>
            </div>
          </section>
        )}

        {mainCustom.map((section) => (
          <section key={section.id} className="us-section">
            <CustomSection
              title={section.title}
              content={section.content}
              onChangeTitle={(value) => setCustomSectionField('mainCustom', section.id, 'title', value)}
              onChangeContent={(value) => setCustomSectionField('mainCustom', section.id, 'content', value)}
              onRemove={() => removeCustomSection('mainCustom', section.id)}
            />
          </section>
        ))}

        <button type="button" className="btn-add" onClick={() => addCustomSection('mainCustom')}>
          <FontAwesomeIcon icon={faPlus} /> {t('actions.addSection')}
        </button>
      </main>
    </div>
  );
}
