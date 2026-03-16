import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { getSupportedLanguage, LANGUAGE_OPTIONS } from '../i18n/languages';
import { useCvStore } from '../store/cvStore';
import { Analytics } from '../lib/analytics';

export default function UILanguageSelector() {
  const { t, i18n } = useTranslation();
  const { cvLanguage, setCvLanguage } = useCvStore();
  const activeLanguage = getSupportedLanguage(i18n.resolvedLanguage ?? i18n.language);

  useEffect(() => {
    if (activeLanguage !== cvLanguage) {
      setCvLanguage(activeLanguage);
    }
  }, [activeLanguage, cvLanguage, setCvLanguage]);

  return (
    <label className="cv-toolbar__language" title={t('uiLanguage.label')}>
      <FontAwesomeIcon icon={faLanguage} className="cv-toolbar__language-icon" />
      <select
        value={activeLanguage}
        onChange={(e) => {
          const nextLanguage = getSupportedLanguage(e.target.value);
          if (nextLanguage === activeLanguage) return;

          Analytics.languageChanged(nextLanguage);
          setCvLanguage(nextLanguage);
          void i18n.changeLanguage(nextLanguage);
        }}
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
