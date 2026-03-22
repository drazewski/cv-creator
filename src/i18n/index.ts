import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import pl from './locales/pl.json';
import de from './locales/de.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import ro from './locales/ro.json';
import { getSupportedLanguage, SUPPORTED_LANGUAGES } from './languages';

const resources = {
  en: { translation: en },
  pl: { translation: pl },
  de: { translation: de },
  es: { translation: es },
  fr: { translation: fr },
  it: { translation: it },
  pt: { translation: pt },
  ro: { translation: ro },
} as const;

function updateDocumentLanguage(language?: string) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = getSupportedLanguage(language);
}

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      supportedLngs: SUPPORTED_LANGUAGES,
      load: 'languageOnly',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },
    });
}

updateDocumentLanguage(i18n.resolvedLanguage ?? i18n.language);
i18n.on('languageChanged', updateDocumentLanguage);

export default i18n;
