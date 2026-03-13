import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { getSupportedLanguage, LANGUAGE_OPTIONS } from '../i18n/languages';

export default function UILanguageSelector() {
  const { t, i18n } = useTranslation();
  const activeLanguage = getSupportedLanguage(i18n.resolvedLanguage ?? i18n.language);

  return (
    <label className="cv-toolbar__language" title={t('uiLanguage.label')}>
      <FontAwesomeIcon icon={faLanguage} className="cv-toolbar__language-icon" />
      <select
        value={activeLanguage}
        onChange={(e) => { void i18n.changeLanguage(e.target.value); }}
        aria-label={t('uiLanguage.label')}
        className="cv-toolbar__language-select"
      >
        {LANGUAGE_OPTIONS.map((language) => (
          <option key={language.code} value={language.code}>
            {language.code.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
