import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import { CvLanguage } from '../data/cv';
import i18n from '../i18n';
import { getSupportedLanguage } from '../i18n/languages';

type ConsentCallbacks = {
  onAnalyticsEnabled: () => void;
  onAnalyticsDisabled: () => void;
};

const COOKIE_TRANSLATIONS: Record<CvLanguage, NonNullable<Parameters<typeof CookieConsent.run>[0]['language']>['translations'][string]> = {
  en: {
    consentModal: {
      title: '🍪 We use cookies',
      description: 'We use essential cookies to make the app work. With your consent we also use analytics cookies to understand how people use MyCeeVee.',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Reject optional',
      showPreferencesBtn: 'Manage preferences',
    },
    preferencesModal: {
      title: 'Cookie preferences',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Reject all optional',
      savePreferencesBtn: 'Save preferences',
      closeIconLabel: 'Close',
      sections: [
        {
          title: 'Essential cookies',
          description: 'These cookies are required for the app to function, for example to save your CV locally. They cannot be disabled.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analytics cookies',
          description: 'These cookies help us understand which features are used and where the product can improve. No personal data is sold.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
  pl: {
    consentModal: {
      title: '🍪 Używamy plików cookie',
      description: 'Używamy niezbędnych plików cookie, aby aplikacja działała. Za Twoją zgodą używamy też analitycznych plików cookie, aby lepiej rozumieć korzystanie z MyCeeVee.',
      acceptAllBtn: 'Akceptuj wszystko',
      acceptNecessaryBtn: 'Odrzuć opcjonalne',
      showPreferencesBtn: 'Zarządzaj preferencjami',
    },
    preferencesModal: {
      title: 'Preferencje plików cookie',
      acceptAllBtn: 'Akceptuj wszystko',
      acceptNecessaryBtn: 'Odrzuć opcjonalne',
      savePreferencesBtn: 'Zapisz preferencje',
      closeIconLabel: 'Zamknij',
      sections: [
        {
          title: 'Niezbędne pliki cookie',
          description: 'Te pliki cookie są wymagane do działania aplikacji, np. do lokalnego zapisywania CV. Nie można ich wyłączyć.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analityczne pliki cookie',
          description: 'Te pliki cookie pomagają nam zrozumieć, z których funkcji korzystają użytkownicy i co warto ulepszyć. Nie sprzedajemy danych osobowych.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
  de: {
    consentModal: {
      title: '🍪 Wir verwenden Cookies',
      description: 'Wir verwenden notwendige Cookies, damit die App funktioniert. Mit deiner Zustimmung nutzen wir auch Analyse-Cookies, um die Nutzung von MyCeeVee besser zu verstehen.',
      acceptAllBtn: 'Alle akzeptieren',
      acceptNecessaryBtn: 'Optionale ablehnen',
      showPreferencesBtn: 'Einstellungen verwalten',
    },
    preferencesModal: {
      title: 'Cookie-Einstellungen',
      acceptAllBtn: 'Alle akzeptieren',
      acceptNecessaryBtn: 'Optionale ablehnen',
      savePreferencesBtn: 'Einstellungen speichern',
      closeIconLabel: 'Schließen',
      sections: [
        {
          title: 'Notwendige Cookies',
          description: 'Diese Cookies sind für die Funktion der App erforderlich, zum Beispiel um deinen CV lokal zu speichern. Sie können nicht deaktiviert werden.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analyse-Cookies',
          description: 'Diese Cookies helfen uns zu verstehen, welche Funktionen genutzt werden und wo wir das Produkt verbessern können. Es werden keine persönlichen Daten verkauft.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
  es: {
    consentModal: {
      title: '🍪 Usamos cookies',
      description: 'Usamos cookies esenciales para que la aplicación funcione. Con tu consentimiento también usamos cookies analíticas para entender mejor cómo se usa MyCeeVee.',
      acceptAllBtn: 'Aceptar todo',
      acceptNecessaryBtn: 'Rechazar opcionales',
      showPreferencesBtn: 'Gestionar preferencias',
    },
    preferencesModal: {
      title: 'Preferencias de cookies',
      acceptAllBtn: 'Aceptar todo',
      acceptNecessaryBtn: 'Rechazar opcionales',
      savePreferencesBtn: 'Guardar preferencias',
      closeIconLabel: 'Cerrar',
      sections: [
        {
          title: 'Cookies esenciales',
          description: 'Estas cookies son necesarias para que la aplicación funcione, por ejemplo para guardar tu CV localmente. No se pueden desactivar.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Cookies analíticas',
          description: 'Estas cookies nos ayudan a entender qué funciones se usan y dónde mejorar el producto. No se venden datos personales.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
  fr: {
    consentModal: {
      title: '🍪 Nous utilisons des cookies',
      description: 'Nous utilisons des cookies essentiels pour faire fonctionner l’application. Avec votre accord, nous utilisons aussi des cookies analytiques pour mieux comprendre l’usage de MyCeeVee.',
      acceptAllBtn: 'Tout accepter',
      acceptNecessaryBtn: 'Refuser les optionnels',
      showPreferencesBtn: 'Gérer les préférences',
    },
    preferencesModal: {
      title: 'Préférences de cookies',
      acceptAllBtn: 'Tout accepter',
      acceptNecessaryBtn: 'Refuser les optionnels',
      savePreferencesBtn: 'Enregistrer les préférences',
      closeIconLabel: 'Fermer',
      sections: [
        {
          title: 'Cookies essentiels',
          description: 'Ces cookies sont nécessaires au fonctionnement de l’application, par exemple pour enregistrer votre CV localement. Ils ne peuvent pas être désactivés.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Cookies analytiques',
          description: 'Ces cookies nous aident à comprendre quelles fonctionnalités sont utilisées et où améliorer le produit. Aucune donnée personnelle n’est vendue.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
  it: {
    consentModal: {
      title: '🍪 Usiamo i cookie',
      description: 'Usiamo cookie essenziali per far funzionare l’app. Con il tuo consenso usiamo anche cookie analitici per capire meglio come viene usato MyCeeVee.',
      acceptAllBtn: 'Accetta tutto',
      acceptNecessaryBtn: 'Rifiuta facoltativi',
      showPreferencesBtn: 'Gestisci preferenze',
    },
    preferencesModal: {
      title: 'Preferenze cookie',
      acceptAllBtn: 'Accetta tutto',
      acceptNecessaryBtn: 'Rifiuta facoltativi',
      savePreferencesBtn: 'Salva preferenze',
      closeIconLabel: 'Chiudi',
      sections: [
        {
          title: 'Cookie essenziali',
          description: 'Questi cookie sono necessari per il funzionamento dell’app, ad esempio per salvare il tuo CV in locale. Non possono essere disattivati.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Cookie analitici',
          description: 'Questi cookie ci aiutano a capire quali funzioni vengono usate e dove migliorare il prodotto. Nessun dato personale viene venduto.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
  pt: {
    consentModal: {
      title: '🍪 Utilizamos cookies',
      description: 'Utilizamos cookies essenciais para que a aplicação funcione. Com o seu consentimento, também usamos cookies analíticos para compreender melhor como o MyCeeVee é utilizado.',
      acceptAllBtn: 'Aceitar tudo',
      acceptNecessaryBtn: 'Rejeitar opcionais',
      showPreferencesBtn: 'Gerir preferências',
    },
    preferencesModal: {
      title: 'Preferências de cookies',
      acceptAllBtn: 'Aceitar tudo',
      acceptNecessaryBtn: 'Rejeitar opcionais',
      savePreferencesBtn: 'Guardar preferências',
      closeIconLabel: 'Fechar',
      sections: [
        {
          title: 'Cookies essenciais',
          description: 'Estes cookies são necessários para o funcionamento da aplicação, por exemplo para guardar o seu CV localmente. Não podem ser desativados.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Cookies analíticos',
          description: 'Estes cookies ajudam-nos a perceber quais funcionalidades são usadas e onde melhorar o produto. Nenhum dado pessoal é vendido.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
};

export function initCookieConsent(callbacks?: ConsentCallbacks) {
  CookieConsent.run({
    onConsent: () => {
      if (CookieConsent.acceptedCategory('analytics')) {
        callbacks?.onAnalyticsEnabled();
      }
    },
    onChange: ({ changedCategories }) => {
      if (changedCategories.includes('analytics')) {
        if (CookieConsent.acceptedCategory('analytics')) {
          callbacks?.onAnalyticsEnabled();
        } else {
          callbacks?.onAnalyticsDisabled();
        }
      }
    },
    guiOptions: {
      consentModal: {
        layout: 'bar',
        position: 'bottom',
        equalWeightButtons: false,
      },
      preferencesModal: {
        layout: 'box',
      },
    },

    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      analytics: {
        enabled: false,
        autoClear: {
          cookies: [
            { name: /^_ph_/ },
            { name: /^_ga/ },
          ],
        },
      },
    },

    language: {
      default: getSupportedLanguage(i18n.resolvedLanguage ?? i18n.language),
      translations: COOKIE_TRANSLATIONS,
    },
  });
}

export function analyticsAllowed(): boolean {
  return CookieConsent.acceptedCategory('analytics');
}
