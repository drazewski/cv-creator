import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCvStore } from '../store/cvStore';
import { CvLanguage, SECTION_TITLE_DEFAULTS } from '../data/cv';
import { Analytics } from '../lib/analytics';
import { LANGUAGE_OPTIONS } from '../i18n/languages';
import './LanguageSelector.css';

export default function LanguageSelector() {
  const { t } = useTranslation();
  const { cvLanguage, setCvLanguage, data } = useCvStore();
  const [confirm, setConfirm] = useState<CvLanguage | null>(null);

  const handleSelect = (lang: CvLanguage) => {
    if (lang === cvLanguage) return;
    const defaults = SECTION_TITLE_DEFAULTS[cvLanguage];
    const customized = (Object.keys(defaults) as (keyof typeof defaults)[]).some(
      (key) => data.sectionTitles[key] !== defaults[key],
    );
    if (customized) {
      setConfirm(lang);
    } else {
      Analytics.languageChanged(lang);
      setCvLanguage(lang);
    }
  };

  const applyChange = () => {
    if (confirm) {
      Analytics.languageChanged(confirm);
      setCvLanguage(confirm);
    }
    setConfirm(null);
  };

  const pendingLanguageLabel = LANGUAGE_OPTIONS.find((language) => language.code === confirm)?.nativeLabel;

  return (
    <div className="lang-selector">
      <div className="lang-selector__label">{t('cvLanguage.label')}</div>
      <div className="lang-selector__grid">
        {LANGUAGE_OPTIONS.map((language) => (
          <button
            key={language.code}
            type="button"
            className={`lang-selector__btn${cvLanguage === language.code ? ' lang-selector__btn--active' : ''}`}
            onClick={() => handleSelect(language.code)}
            title={language.nativeLabel}
          >
            <span className="lang-selector__flag">{language.flag}</span>
            <span className="lang-selector__code">{language.code.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {confirm && (
        <div className="lang-selector__confirm">
          <p>{t('cvLanguage.confirmMessage', { language: pendingLanguageLabel })}</p>
          <div className="lang-selector__confirm-actions">
            <button type="button" className="lang-selector__confirm-yes" onClick={applyChange}>{t('actions.apply')}</button>
            <button type="button" className="lang-selector__confirm-no" onClick={() => setConfirm(null)}>{t('actions.cancel')}</button>
          </div>
        </div>
      )}
    </div>
  );
}
