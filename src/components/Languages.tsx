import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCvStore } from '../store/cvStore';
import EditableText from './EditableText';
import './Languages.css';

export default function Languages() {
  const { t } = useTranslation();
  const {
    data: { languages, sectionTitles },
    setLanguageEntry,
    addLanguageEntry,
    removeLanguageEntry,
    setSectionTitle,
  } = useCvStore();

  return (
    <section className="languages">
      <h2 className="cv-section__title">
        <EditableText value={sectionTitles.languages} onChange={(value) => setSectionTitle('languages', value)} />
      </h2>
      <div className="languages__list">
        {languages.map((language, index) => (
          <div key={index} className="languages__item">
            <EditableText value={language} onChange={(value) => setLanguageEntry(index, value)} onRemove={() => removeLanguageEntry(index)} />
          </div>
        ))}
      </div>
      <button type="button" className="btn-add" onClick={addLanguageEntry}>
        <FontAwesomeIcon icon={faPlus} /> {t('actions.add')}
      </button>
    </section>
  );
}
