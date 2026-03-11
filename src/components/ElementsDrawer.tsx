import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { useCvStore } from '../store/cvStore';
import { useSettingsStore, VisibilityKey, SidebarKey, MainKey } from '../store/settingsStore';
import { SectionTitles } from '../data/cv';
import EditableText from './EditableText';
import './ElementsDrawer.css';

const SIDEBAR_LABELS: Record<SidebarKey, string> = {
  photo: 'Photo', name: 'Name', title: 'Title', position: 'Position', location: 'Location',
  email: 'Email', webpage: 'Website', github: 'GitHub', linkedin: 'LinkedIn',
  technologies: 'Technologies',
};

const SIDEBAR_TITLE_KEYS: Partial<Record<SidebarKey, keyof SectionTitles>> = {
  technologies: 'technologies',
};

const MAIN_LABELS: Record<MainKey, string> = {
  aboutMe: 'About Me', experience: 'Experience',
  education: 'Education', courses: 'Courses & Certifications',
};

const MAIN_TITLE_KEYS: Record<MainKey, keyof SectionTitles> = {
  aboutMe: 'aboutMe', experience: 'experience',
  education: 'education', courses: 'courses',
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
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
        {order.map((key, i) => {
          const titleKey = titleKeys[key];
          return (
            <li
              key={key}
              className={`ed-item${dragOver === i ? ' ed-item--drag-over' : ''}`}
              draggable
              onDragStart={() => { dragIndex.current = i; }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(i); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => {
                if (dragIndex.current !== null && dragIndex.current !== i) {
                  onReorder(dragIndex.current, i);
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
                    onChange={(v) => setSectionTitle(titleKey, v)}
                  />
                ) : (
                  labels[key]
                )}
              </span>
              <Toggle
                checked={visibility[key]}
                onChange={(v) => setVisibility(key as VisibilityKey, v)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function ElementsDrawer() {
  const { sidebarOrder, mainOrder, reorderSidebar, reorderMain } = useSettingsStore();

  return (
    <div className="elements-drawer">
      <DraggableSection
        title="Sidebar"
        order={sidebarOrder}
        labels={SIDEBAR_LABELS}
        titleKeys={SIDEBAR_TITLE_KEYS}
        onReorder={reorderSidebar}
      />
      <div className="ed-divider" />
      <DraggableSection
        title="Main content"
        order={mainOrder}
        labels={MAIN_LABELS}
        titleKeys={MAIN_TITLE_KEYS}
        onReorder={reorderMain}
      />
    </div>
  );
}
