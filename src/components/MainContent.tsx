import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCvStore } from '../store/cvStore';
import { useSettingsStore, MainKey } from '../store/settingsStore';
import './MainContent.css';
import AboutMe from './AboutMe';
import Experience from './Experience';
import Education from './Education';
import Courses from './Courses';
import CustomSection from './CustomSection';

const SECTION_MAP: Record<MainKey, React.ComponentType> = {
  aboutMe: AboutMe,
  experience: Experience,
  education: Education,
  courses: Courses,
};

export default function MainContent() {
  const { t } = useTranslation();
  const { visibility, mainOrder } = useSettingsStore();
  const { data: { mainCustom }, addCustomSection, removeCustomSection, setCustomSectionField } = useCvStore();

  return (
    <main className="main-content">
      {mainOrder.map((key) => {
        if (!visibility[key]) return null;
        const Section = SECTION_MAP[key];
        return <Section key={key} />;
      })}

      {mainCustom.map((section) => (
        <CustomSection
          key={section.id}
          title={section.title}
          content={section.content}
          onChangeTitle={(value) => setCustomSectionField('mainCustom', section.id, 'title', value)}
          onChangeContent={(value) => setCustomSectionField('mainCustom', section.id, 'content', value)}
          onRemove={() => removeCustomSection('mainCustom', section.id)}
        />
      ))}

      <button
        type="button"
        className="btn-add"
        onClick={() => addCustomSection('mainCustom')}
      >
        <FontAwesomeIcon icon={faPlus} /> {t('actions.addSection')}
      </button>
    </main>
  );
}
