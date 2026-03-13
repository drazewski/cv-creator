import { CvLanguage } from '../data/cv';

export interface LanguageOption {
  code: CvLanguage;
  nativeLabel: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'pl', nativeLabel: 'Polski', flag: '🇵🇱' },
  { code: 'de', nativeLabel: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', nativeLabel: 'Español', flag: '🇪🇸' },
  { code: 'fr', nativeLabel: 'Français', flag: '🇫🇷' },
  { code: 'it', nativeLabel: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', nativeLabel: 'Português', flag: '🇵🇹' },
];

export const SUPPORTED_LANGUAGES = LANGUAGE_OPTIONS.map(({ code }) => code);

const SUPPORTED_LANGUAGE_SET = new Set<CvLanguage>(SUPPORTED_LANGUAGES);

export function getSupportedLanguage(language?: string | null): CvLanguage {
  if (!language) return 'en';

  const normalized = language.toLowerCase();
  if (SUPPORTED_LANGUAGE_SET.has(normalized as CvLanguage)) return normalized as CvLanguage;

  const baseLanguage = normalized.split('-')[0];
  if (SUPPORTED_LANGUAGE_SET.has(baseLanguage as CvLanguage)) return baseLanguage as CvLanguage;

  return 'en';
}
