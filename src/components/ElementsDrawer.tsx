import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { useCvStore } from '../store/cvStore';
import { useSettingsStore, VisibilityKey, SidebarKey, MainKey } from '../store/settingsStore';
import { SectionTitles } from '../data/cv';
import EditableText from './EditableText';
import './ElementsDrawer.css';

const SIDEBAR_TITLE_KEYS: Partial<Record<SidebarKey, keyof SectionTitles>> = {
  technologies: 'technologies',
};

const MAIN_TITLE_KEYS: Record<MainKey, keyof SectionTitles> = {
  aboutMe: 'aboutMe',
  experience: 'experience',
  education: 'education',
  courses: 'courses',
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`ed-toggle ${checked ? 'ed-toggle--on' : ''}`}
    >
      <span className="ed-toggle__thumb" />
    </button>
  );
}

function DraggableSection<K extends VisibilityKey>({
  title,
  order,
  labels,
  titleKeys,
  onReorder,
}: {
  title: string;
  order: K[];
  labels: Record<K, string>;
  titleKeys: Partial<Record<K, keyof SectionTitles>>;
  onReorder: (from: number, to: number) => void;
}) {
  const { visibility, setVisibility } = useSettingsStore();
  const { data: { sectionTitles }, setSectionTitle } = useCvStore();
  const dragIndex = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  return (
    <div className="ed-section">
      <h3 className="ed-section__title">{title}</h3>
      <ul className="ed-list">
        {order.map((key, index) => {
          const titleKey = titleKeys[key];
          return (
            <li
              key={key}
              className={`ed-item${dragOver === index ? ' ed-item--drag-over' : ''}`}
              draggable
              onDragStart={() => { dragIndex.current = index; }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(index); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => {
                if (dragIndex.current !== null && dragIndex.current !== index) {
                  onReorder(dragIndex.current, index);
                }
                dragIndex.current = null;
                setDragOver(null);
              }}
              onDragEnd={() => { dragIndex.current = null; setDragOver(null); }}
            >
              <FontAwesomeIcon icon={faGripVertical} className="ed-item__grip" />
              <span className="ed-item__label">
                {titleKey ? (
                  <EditableText
                    value={sectionTitles[titleKey]}
                    onChange={(value) => setSectionTitle(titleKey, value)}
                  />
                ) : (
                  labels[key]
                )}
              </span>
              <Toggle
                checked={visibility[key]}
                onChange={(value) => setVisibility(key as VisibilityKey, value)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const US_HEADER_FIXED: SidebarKey[] = ['photo', 'title'];
const US_CONTACT_KEY_SET = new Set<SidebarKey>(['position', 'location', 'email', 'webpage', 'github', 'linkedin']);

function StaticSection({ title, keys, labels }: {
  title: string;
  keys: SidebarKey[];
  labels: Record<SidebarKey, string>;
}) {
  const { visibility, setVisibility } = useSettingsStore();

  return (
    <div className="ed-section">
      <h3 className="ed-section__title">{title}</h3>
      <ul className="ed-list">
        {keys.map((key) => (
          <li key={key} className="ed-item">
            <span className="ed-item__grip ed-item__grip--spacer" />
            <span className="ed-item__label">{labels[key]}</span>
            <Toggle
              checked={visibility[key]}
              onChange={(value) => setVisibility(key as VisibilityKey, value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ElementsDrawer() {
  const { t } = useTranslation();
  const { sidebarOrder, mainOrder, reorderSidebar, reorderMain, layoutId, visibility, setVisibility } = useSettingsStore();

  const sidebarLabels: Record<SidebarKey, string> = {
    photo: t('elements.photo'),
    name: t('elements.name'),
    title: t('elements.title'),
    position: t('elements.position'),
    location: t('elements.location'),
    email: t('elements.email'),
    webpage: t('elements.website'),
    github: t('elements.github'),
    linkedin: t('elements.linkedin'),
    technologies: t('elements.technologies'),
  };

  const mainLabels: Record<MainKey, string> = {
    aboutMe: t('elements.mainContent'),
    experience: t('elements.mainContent'),
    education: t('elements.mainContent'),
    courses: t('elements.mainContent'),
  };

  const contactOrder = sidebarOrder.filter((key): key is SidebarKey => US_CONTACT_KEY_SET.has(key));

  const reorderContact = (from: number, to: number) => {
    const fromKey = contactOrder[from];
    const toKey = contactOrder[to];
    const fromIndex = sidebarOrder.indexOf(fromKey);
    const toIndex = sidebarOrder.indexOf(toKey);
    if (fromIndex !== -1 && toIndex !== -1) reorderSidebar(fromIndex, toIndex);
  };

  return (
    <div className="elements-drawer">
      {layoutId === 'us-single' ? (
        <>
          <StaticSection
            title={t('elements.header')}
            keys={US_HEADER_FIXED}
            labels={sidebarLabels}
          />
          <div className="ed-divider" />
          <DraggableSection
            title={t('elements.contact')}
            order={contactOrder}
            labels={sidebarLabels}
            titleKeys={SIDEBAR_TITLE_KEYS}
            onReorder={reorderContact}
          />
          <div className="ed-divider" />
          <DraggableSection
            title={t('elements.mainContent')}
            order={mainOrder}
            labels={mainLabels}
            titleKeys={MAIN_TITLE_KEYS}
            onReorder={reorderMain}
          />
          <div className="ed-divider" />
          <div className="ed-section">
            <h3 className="ed-section__title">{t('elements.technologies')}</h3>
            <ul className="ed-list">
              <li className="ed-item">
                <span className="ed-item__grip ed-item__grip--spacer" />
                <span className="ed-item__label">{sidebarLabels.technologies}</span>
                <Toggle
                  checked={visibility.technologies}
                  onChange={(value) => setVisibility('technologies', value)}
                />
              </li>
            </ul>
          </div>
        </>
      ) : (
        <DraggableSection
          title={t('elements.sidebar')}
          order={sidebarOrder}
          labels={sidebarLabels}
          titleKeys={SIDEBAR_TITLE_KEYS}
          onReorder={reorderSidebar}
        />
      )}
      {layoutId !== 'us-single' && (
        <>
          <div className="ed-divider" />
          <DraggableSection
            title={t('elements.mainContent')}
            order={mainOrder}
            labels={mainLabels}
            titleKeys={MAIN_TITLE_KEYS}
            onReorder={reorderMain}
          />
        </>
      )}
    </div>
  );
}
