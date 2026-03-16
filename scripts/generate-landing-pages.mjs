import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const localeDir = path.join(rootDir, 'src/i18n/locales');
const publicDir = path.join(rootDir, 'public');

const LOCALES = [
  { code: 'en', path: '', nativeLabel: 'EN', ogLocale: 'en_US' },
  { code: 'pl', path: 'pl', nativeLabel: 'PL', ogLocale: 'pl_PL' },
  { code: 'de', path: 'de', nativeLabel: 'DE', ogLocale: 'de_DE' },
  { code: 'es', path: 'es', nativeLabel: 'ES', ogLocale: 'es_ES' },
  { code: 'fr', path: 'fr', nativeLabel: 'FR', ogLocale: 'fr_FR' },
  { code: 'it', path: 'it', nativeLabel: 'IT', ogLocale: 'it_IT' },
  { code: 'pt', path: 'pt', nativeLabel: 'PT', ogLocale: 'pt_PT' },
];

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

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
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
