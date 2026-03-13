import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCvStore } from '../store/cvStore';
import EditableText from './EditableText';
import './AboutMe.css';

export default function AboutMe() {
  const { t } = useTranslation();
  const { data: { aboutMe, sectionTitles }, setAboutMeItem, addAboutMeItem, removeAboutMeItem, setSectionTitle } = useCvStore();

  return (
    <section className="about-me">
      <h2 className="cv-section__title">
        <EditableText value={sectionTitles.aboutMe} onChange={(value) => setSectionTitle('aboutMe', value)} />
      </h2>
      <div className="about-me__list">
        {aboutMe.map((point, index) => (
          <div key={index} className="about-me__item">
            <EditableText value={point} onChange={(value) => setAboutMeItem(index, value)} multiline onRemove={() => removeAboutMeItem(index)} />
          </div>
        ))}
      </div>
      <button type="button" className="btn-add" onClick={addAboutMeItem}>
        <FontAwesomeIcon icon={faPlus} /> {t('actions.addPoint')}
      </button>
    </section>
  );
}
