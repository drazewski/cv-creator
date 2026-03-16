import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const localeDir = path.join(rootDir, 'src/i18n/locales');
const publicDir = path.join(rootDir, 'public');

// ── Environment variables (PostHog) ────────────────────────────────────────
function loadEnvVars() {
  const envFile = path.join(rootDir, '.env');
  const fileVars = {};
  if (existsSync(envFile)) {
    for (const line of readFileSync(envFile, 'utf8').split('\n')) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (m) fileVars[m[1]] = m[2].trim();
    }
  }
  return {
    posthogKey: process.env.VITE_PUBLIC_POSTHOG_KEY || fileVars.VITE_PUBLIC_POSTHOG_KEY || '',
    posthogHost: process.env.VITE_PUBLIC_POSTHOG_HOST || fileVars.VITE_PUBLIC_POSTHOG_HOST || '',
  };
}

const env = loadEnvVars();

const LOCALES = [
  { code: 'en', path: '', nativeLabel: 'EN', ogLocale: 'en_US' },
  { code: 'pl', path: 'pl', nativeLabel: 'PL', ogLocale: 'pl_PL' },
  { code: 'de', path: 'de', nativeLabel: 'DE', ogLocale: 'de_DE' },
  { code: 'es', path: 'es', nativeLabel: 'ES', ogLocale: 'es_ES' },
  { code: 'fr', path: 'fr', nativeLabel: 'FR', ogLocale: 'fr_FR' },
  { code: 'it', path: 'it', nativeLabel: 'IT', ogLocale: 'it_IT' },
  { code: 'pt', path: 'pt', nativeLabel: 'PT', ogLocale: 'pt_PT' },
];

// ── Cookie-consent translations (mirrors src/lib/cookieconsent.ts) ──────────
const COOKIE_TRANSLATIONS = {
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
        { title: 'Essential cookies', description: 'These cookies are required for the app to function, for example to save your CV locally. They cannot be disabled.', linkedCategory: 'necessary' },
        { title: 'Analytics cookies', description: 'These cookies help us understand which features are used and where the product can improve. No personal data is sold.', linkedCategory: 'analytics' },
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
        { title: 'Niezbędne pliki cookie', description: 'Te pliki cookie są wymagane do działania aplikacji, np. do lokalnego zapisywania CV. Nie można ich wyłączyć.', linkedCategory: 'necessary' },
        { title: 'Analityczne pliki cookie', description: 'Te pliki cookie pomagają nam zrozumieć, z których funkcji korzystają użytkownicy i co warto ulepszyć. Nie sprzedajemy danych osobowych.', linkedCategory: 'analytics' },
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
        { title: 'Notwendige Cookies', description: 'Diese Cookies sind für die Funktion der App erforderlich, zum Beispiel um deinen CV lokal zu speichern. Sie können nicht deaktiviert werden.', linkedCategory: 'necessary' },
        { title: 'Analyse-Cookies', description: 'Diese Cookies helfen uns zu verstehen, welche Funktionen genutzt werden und wo wir das Produkt verbessern können. Es werden keine persönlichen Daten verkauft.', linkedCategory: 'analytics' },
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
        { title: 'Cookies esenciales', description: 'Estas cookies son necesarias para que la aplicación funcione, por ejemplo para guardar tu CV localmente. No se pueden desactivar.', linkedCategory: 'necessary' },
        { title: 'Cookies analíticas', description: 'Estas cookies nos ayudan a entender qué funciones se usan y dónde mejorar el producto. No se venden datos personales.', linkedCategory: 'analytics' },
      ],
    },
  },
  fr: {
    consentModal: {
      title: '🍪 Nous utilisons des cookies',
      description: "Nous utilisons des cookies essentiels pour faire fonctionner l\u2019application. Avec votre accord, nous utilisons aussi des cookies analytiques pour mieux comprendre l\u2019usage de MyCeeVee.",
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
        { title: 'Cookies essentiels', description: "Ces cookies sont nécessaires au fonctionnement de l\u2019application, par exemple pour enregistrer votre CV localement. Ils ne peuvent pas être désactivés.", linkedCategory: 'necessary' },
        { title: 'Cookies analytiques', description: "Ces cookies nous aident à comprendre quelles fonctionnalités sont utilisées et où améliorer le produit. Aucune donnée personnelle n\u2019est vendue.", linkedCategory: 'analytics' },
      ],
    },
  },
  it: {
    consentModal: {
      title: '🍪 Usiamo i cookie',
      description: "Usiamo cookie essenziali per far funzionare l\u2019app. Con il tuo consenso usiamo anche cookie analitici per capire meglio come viene usato MyCeeVee.",
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
        { title: 'Cookie essenziali', description: "Questi cookie sono necessari per il funzionamento dell\u2019app, ad esempio per salvare il tuo CV in locale. Non possono essere disattivati.", linkedCategory: 'necessary' },
        { title: 'Cookie analitici', description: 'Questi cookie ci aiutano a capire quali funzioni vengono usate e dove migliorare il prodotto. Nessun dato personale viene venduto.', linkedCategory: 'analytics' },
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
        { title: 'Cookies essenciais', description: 'Estes cookies são necessários para o funcionamento da aplicação, por exemplo para guardar o seu CV localmente. Não podem ser desativados.', linkedCategory: 'necessary' },
        { title: 'Cookies analíticos', description: 'Estes cookies ajudam-nos a perceber quais funcionalidades são usadas e onde melhorar o produto. Nenhum dado pessoal é vendido.', linkedCategory: 'analytics' },
      ],
    },
  },
};

// PostHog async loader snippet (official)
const POSTHOG_SNIPPET = '!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);';

function renderConsentAndAnalyticsScripts(langCode) {
  const translation = COOKIE_TRANSLATIONS[langCode] || COOKIE_TRANSLATIONS.en;
  const hasPosthog = env.posthogKey && env.posthogHost;

  const posthogInit = hasPosthog
    ? `
    var isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (!isLocal) {
      ${POSTHOG_SNIPPET}
      posthog.init('${env.posthogKey}', {
        api_host: '${env.posthogHost}',
        persistence: 'memory',
        autocapture: false,
        capture_pageview: false,
        loaded: function(ph) {
          if (!CookieConsent.acceptedCategory('analytics')) {
            ph.opt_out_capturing();
          }
        }
      });
    }
    function _mcEnableAnalytics() {
      if (isLocal) return;
      posthog.opt_in_capturing();
      posthog.capture('$pageview');
    }
    function _mcDisableAnalytics() {
      if (isLocal) return;
      posthog.opt_out_capturing();
      posthog.reset();
    }`
    : `
    function _mcEnableAnalytics() {}
    function _mcDisableAnalytics() {}`;

  return `
    <script src="https://cdn.jsdelivr.net/npm/vanilla-cookieconsent@3.1.0/dist/cookieconsent.umd.js"></script>
    <script>
    (function() {${posthogInit}

      CookieConsent.run({
        onConsent: function() {
          if (CookieConsent.acceptedCategory('analytics')) _mcEnableAnalytics();
        },
        onChange: function(param) {
          if (param.changedCategories.indexOf('analytics') > -1) {
            if (CookieConsent.acceptedCategory('analytics')) _mcEnableAnalytics();
            else _mcDisableAnalytics();
          }
        },
        guiOptions: {
          consentModal: { layout: 'bar', position: 'bottom', equalWeightButtons: false },
          preferencesModal: { layout: 'box' }
        },
        categories: {
          necessary: { enabled: true, readOnly: true },
          analytics: { enabled: false, autoClear: { cookies: [{ name: /^_ph_/ }, { name: /^_ga/ }] } }
        },
        language: {
          default: '${langCode}',
          translations: ${JSON.stringify({ [langCode]: translation })}
        }
      });
    })();
    </script>`;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildUrl(localePath) {
  return localePath ? `https://myceevee.com/${localePath}/` : 'https://myceevee.com/';
}

function buildAlternateLinks(activeCode) {
  return [
    '<link rel="alternate" hreflang="x-default" href="https://myceevee.com/" />',
    ...LOCALES.map((locale) => {
      const href = buildUrl(locale.path);
      return `<link rel="alternate" hreflang="${locale.code}" href="${href}" />`;
    }),
    activeCode === 'en' ? '<link rel="canonical" href="https://myceevee.com/" />' : `<link rel="canonical" href="${buildUrl(activeCode)}" />`,
  ].join('\n    ');
}

function renderSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = LOCALES.map((locale) => {
    const loc = buildUrl(locale.path);
    const priority = locale.code === 'en' ? '1.0' : '0.9';

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function renderLanguageOptions(activeCode) {
  return LOCALES.map((locale) => {
    const href = locale.path ? `/${locale.path}/` : '/';
    const selected = locale.code === activeCode ? ' selected' : '';
    return `<option value="${href}" lang="${locale.code}"${selected}>${locale.nativeLabel}</option>`;
  }).join('');
}

function renderFeatureCard(icon, title, text) {
  return `
          <article class="landing-card">
            <div class="landing-card__icon">${icon}</div>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(text)}</p>
          </article>`;
}

function renderFaq(question, answer) {
  return `
            <article class="landing-faq__item">
              <h3>${escapeHtml(question)}</h3>
              <p>${escapeHtml(answer)}</p>
            </article>`;
}

function renderFaqItems(faq) {
  return Object.entries(faq)
    .filter(([key]) => key.startsWith('question'))
    .sort(([left], [right]) => left.localeCompare(right, undefined, { numeric: true }))
    .map(([questionKey, question]) => {
      const answerKey = questionKey.replace('question', 'answer');
      const answer = faq[answerKey];

      if (!question || !answer) {
        return '';
      }

      return renderFaq(question, answer);
    })
    .join('\n');
}

function renderPage(locale, messages) {
  const { landing } = messages;
  const pageUrl = buildUrl(locale.path);
  const alternateLinks = buildAlternateLinks(locale.code);
  const twitterDescription = landing.twitterDescription ?? landing.metaDescription;
  const structuredDescription = landing.structuredDescription ?? landing.metaDescription;
  const otherLocales = LOCALES.filter((item) => item.code !== locale.code)
    .map((item) => `<meta property="og:locale:alternate" content="${item.ogLocale}" />`)
    .join('\n    ');

  const faqEntries = Object.entries(landing.faq ?? {})
    .filter(([key]) => key.startsWith('question'))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .reduce((acc, [qKey, question]) => {
      const answer = landing.faq[qKey.replace('question', 'answer')];
      if (question && answer) {
        acc.push({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } });
      }
      return acc;
    }, []);

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: landing.metaTitle,
        url: pageUrl,
        inLanguage: locale.code,
        description: structuredDescription,
        isPartOf: {
          '@type': 'WebSite',
          name: 'MyCeeVee',
          url: 'https://myceevee.com/',
        },
      },
      {
        '@type': 'WebApplication',
        name: 'MyCeeVee',
        url: 'https://myceevee.com/app/',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        inLanguage: locale.code,
        description: structuredDescription,
      },
      ...(faqEntries.length > 0 ? [{
        '@type': 'FAQPage',
        mainEntity: faqEntries,
      }] : []),
    ],
  }, null, 2);

  return `<!doctype html>
<html lang="${locale.code}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(landing.metaTitle)}</title>
    <meta name="description" content="${escapeHtml(landing.metaDescription)}" />
    <meta name="robots" content="index, follow" />
    ${alternateLinks}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:title" content="${escapeHtml(landing.metaTitle)}" />
    <meta property="og:description" content="${escapeHtml(landing.metaDescription)}" />
    <meta property="og:image" content="https://myceevee.com/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="MyCeeVee" />
    <meta property="og:locale" content="${locale.ogLocale}" />
    ${otherLocales}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(landing.metaTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(twitterDescription)}" />
    <meta name="twitter:image" content="https://myceevee.com/og-image.png" />
    <script type="application/ld+json">
${jsonLd}
    </script>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/landing-static.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vanilla-cookieconsent@3.1.0/dist/cookieconsent.css" />
  </head>
  <body>
    <header class="landing-header">
      <div class="landing-toolbar">
        <a href="/" class="cv-toolbar__logo" title="MyCeeVee">My<span class="cv-toolbar__logo-c">C</span><span class="cv-toolbar__logo-ee">ee</span><span class="cv-toolbar__logo-v">V</span><span class="cv-toolbar__logo-ee">ee</span></a>
        <div class="landing-toolbar__right">
          <label class="cv-toolbar__language landing-language-dropdown" title="Language selector">
            <select class="cv-toolbar__language-select landing-language-dropdown__select" aria-label="Language selector" onchange="window.location.href=this.value">
              ${renderLanguageOptions(locale.code)}
            </select>
          </label>
          <a href="/app/" class="landing-toolbar__cta">${escapeHtml(landing.createCv)}</a>
        </div>
      </div>
    </header>

    <main class="landing-main">
      <section class="landing-section landing-hero">
        <div class="landing-hero__content">
          <p class="landing-eyebrow">${escapeHtml(landing.eyebrow)}</p>
          <h1 class="landing-hero__title">${escapeHtml(landing.heroTitle)}</h1>
          <p class="landing-hero__lead">${escapeHtml(landing.heroLead)}</p>
          <div class="landing-hero__actions">
            <a href="/app/" class="landing-btn landing-btn--primary">${escapeHtml(landing.createCv)}</a>
            <a href="#why" class="landing-btn landing-btn--secondary">${escapeHtml(landing.learnMore)}</a>
          </div>
          <ul class="landing-trust">
            <li>${escapeHtml(landing.trust.fast)}</li>
            <li>${escapeHtml(landing.trust.noAccount)}</li>
            <li>${escapeHtml(landing.trust.ats)}</li>
            <li>${escapeHtml(landing.trust.multilang)}</li>
            <li>${escapeHtml(landing.trust.school)}</li>
          </ul>
        </div>

          <div class="landing-hero__visual" aria-hidden="true">
          <div class="landing-preview-card landing-preview-card--front">
            <span class="landing-preview-card__badge">${escapeHtml(landing.preview.classicBadge)}</span>
            <div class="landing-preview-classic">
              <div class="landing-preview-classic__header">
                <span class="landing-preview-classic__name"></span>
                <span class="landing-preview-classic__title"></span>
              </div>
              <div class="landing-preview-classic__divider"></div>
              <div class="landing-preview-classic__section">
                <span class="landing-preview-classic__section-title"></span>
                <div class="landing-preview-card__lines landing-preview-card__lines--classic">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="landing-preview-classic__divider"></div>
              <div class="landing-preview-classic__section">
                <span class="landing-preview-classic__section-title landing-preview-classic__section-title--wide"></span>
                <div class="landing-preview-card__lines landing-preview-card__lines--classic">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="landing-preview-classic__divider"></div>
              <div class="landing-preview-classic__section">
                <span class="landing-preview-classic__section-title landing-preview-classic__section-title--narrow"></span>
                <div class="landing-preview-card__lines landing-preview-card__lines--classic">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div class="landing-preview-card landing-preview-card--back">
            <span class="landing-preview-card__badge">${escapeHtml(landing.preview.atsBadge)}</span>
            <div class="landing-preview-card__lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="landing-preview-card__lines landing-preview-card__lines--compact">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="landing-preview-chip">${escapeHtml(landing.preview.customiseChip)}</div>
        </div>
      </section>

      <section id="why" class="landing-section">
        <div class="landing-section__intro">
          <p class="landing-eyebrow">${escapeHtml(landing.sections.whyEyebrow)}</p>
          <h2>${escapeHtml(landing.sections.whyTitle)}</h2>
          <p>${escapeHtml(landing.sections.whyLead)}</p>
        </div>
        <div class="landing-feature-grid">
${renderFeatureCard('A', landing.features.speedTitle, landing.features.speedText)}
${renderFeatureCard('B', landing.features.flexibleTitle, landing.features.flexibleText)}
${renderFeatureCard('C', landing.features.multilingualTitle, landing.features.multilingualText)}
${renderFeatureCard('D', landing.features.studentTitle, landing.features.studentText)}
        </div>
      </section>

      <section class="landing-section landing-section--seo">
        <div class="landing-seo-layout">
          <div class="landing-seo-copy">
            <div class="landing-section__intro">
              <p class="landing-eyebrow">${escapeHtml(landing.sections.seoEyebrow)}</p>
              <h2>${escapeHtml(landing.sections.seoTitle)}</h2>
            </div>
            <p class="landing-seo-copy__lead">${escapeHtml(landing.seo.lead)}</p>
            <p>${escapeHtml(landing.seo.paragraph1)}</p>
            <p>${escapeHtml(landing.seo.paragraph2)}</p>
            <p>${escapeHtml(landing.seo.paragraph3)}</p>
          </div>
          <div class="landing-seo-visual">
            <img src="/landing-seo-person.jpg" alt="" class="landing-seo-visual__image" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <section class="landing-section">
        <div class="landing-section__intro">
          <p class="landing-eyebrow">${escapeHtml(landing.sections.faqEyebrow)}</p>
          <h2>${escapeHtml(landing.sections.faqTitle)}</h2>
        </div>
        <div class="landing-faq">
${renderFaqItems(landing.faq)}
        </div>
      </section>

      <section class="landing-section landing-cta">
        <div class="landing-cta__panel">
          <h2>${escapeHtml(landing.final.title)}</h2>
          <p>${escapeHtml(landing.final.text)}</p>
          <a href="/app/" class="landing-btn landing-btn--primary">${escapeHtml(landing.final.cta)}</a>
        </div>
      </section>
    </main>
${renderConsentAndAnalyticsScripts(locale.code)}
  </body>
</html>
`;
}

for (const locale of LOCALES) {
  const localePath = path.join(localeDir, `${locale.code}.json`);
  const messages = JSON.parse(await readFile(localePath, 'utf8'));
  const html = renderPage(locale, messages);
  const targetDir = locale.path ? path.join(rootDir, locale.path) : rootDir;
  await mkdir(targetDir, { recursive: true });
  await writeFile(path.join(targetDir, 'index.html'), html);
}

await writeFile(path.join(publicDir, 'sitemap.xml'), renderSitemap());

console.log(`generated ${LOCALES.length} landing pages`);
