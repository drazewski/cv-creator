import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useCvStore } from '../store/cvStore';
import EditableText from './EditableText';
import './Education.css';

export default function Education() {
  const { t } = useTranslation();
  const { data: { education, sectionTitles }, setEducationField, addEducation, removeEducation, setSectionTitle } = useCvStore();

  return (
    <section className="education">
      <h2 className="cv-section__title">
        <EditableText value={sectionTitles.education} onChange={(value) => setSectionTitle('education', value)} />
      </h2>
      <div className="education__list">
        {education.map((entry, index) => (
          <div key={index} className="education__entry">
            <div className="education__header">
              <div>
                <h3 className="education__degree">
                  <EditableText value={entry.degree} onChange={(value) => setEducationField(index, 'degree', value)} />
                </h3>
                <p className="education__institution">
                  <EditableText value={entry.institution} onChange={(value) => setEducationField(index, 'institution', value)} />
                </p>
              </div>
              <div className="education__header-right">
                <span className="education__period">
                  <EditableText value={entry.period} onChange={(value) => setEducationField(index, 'period', value)} />
                </span>
                <button type="button" className="btn-entry-remove" title={t('actions.remove')} onClick={() => removeEducation(index)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="btn-add" onClick={addEducation}>
        <FontAwesomeIcon icon={faPlus} /> {t('actions.addEducation')}
      </button>
    </section>
  );
}
