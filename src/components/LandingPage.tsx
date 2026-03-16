import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBolt,
  faGlobe,
  faGraduationCap,
  faLayerGroup,
  faListCheck,
  faAlignLeft,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import UILanguageSelector from './UILanguageSelector';
import BrandLogo from './BrandLogo';
import { setDocumentMetadata } from '../lib/metadata';
import './LandingPage.css';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setDocumentMetadata(
      t('landing.metaTitle'),
      t('landing.metaDescription'),
    );
  }, [i18n.resolvedLanguage, t]);

  const featureItems = [
    { icon: faBolt, title: t('landing.features.speedTitle'), text: t('landing.features.speedText') },
    { icon: faLayerGroup, title: t('landing.features.flexibleTitle'), text: t('landing.features.flexibleText') },
    { icon: faGlobe, title: t('landing.features.multilingualTitle'), text: t('landing.features.multilingualText') },
    { icon: faGraduationCap, title: t('landing.features.studentTitle'), text: t('landing.features.studentText') },
  ];

  const stepItems = [
    { number: '01', title: t('landing.steps.step1Title'), text: t('landing.steps.step1Text') },
    { number: '02', title: t('landing.steps.step2Title'), text: t('landing.steps.step2Text') },
    { number: '03', title: t('landing.steps.step3Title'), text: t('landing.steps.step3Text') },
  ];

  const atsItems = [
    { icon: faListCheck, title: t('landing.ats.item1Title'), text: t('landing.ats.item1Text') },
    { icon: faAlignLeft, title: t('landing.ats.item2Title'), text: t('landing.ats.item2Text') },
    { icon: faBolt, title: t('landing.ats.item3Title'), text: t('landing.ats.item3Text') },
  ];

  const faqItems = [
    { question: t('landing.faq.question1'), answer: t('landing.faq.answer1') },
    { question: t('landing.faq.question2'), answer: t('landing.faq.answer2') },
    { question: t('landing.faq.question3'), answer: t('landing.faq.answer3') },
    { question: t('landing.faq.question4'), answer: t('landing.faq.answer4') },
    { question: t('landing.faq.question5'), answer: t('landing.faq.answer5') },
  ];

  return (
    <div className="landing-page">
      <header className="cv-header cv-header--sticky">
        <div className="cv-toolbar landing-toolbar">
          <BrandLogo
            href="/"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('/');
            }}
          />
          <div className="cv-toolbar__actions">
            <UILanguageSelector />
            <button className="cv-toolbar__preview landing-toolbar__cta" onClick={() => onNavigate('/app')}>
              <span>{t('landing.createCv')}</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </header>

      <main className="landing-main">
        <section className="landing-section landing-hero">
          <div className="landing-hero__content">
            <p className="landing-eyebrow">{t('landing.eyebrow')}</p>
            <h1 className="landing-hero__title">{t('landing.heroTitle')}</h1>
            <p className="landing-hero__lead">{t('landing.heroLead')}</p>
            <div className="landing-hero__audience">
              <FontAwesomeIcon icon={faGraduationCap} />
              <span>{t('landing.heroAudience')}</span>
            </div>
            <div className="landing-hero__actions">
              <button className="landing-btn landing-btn--primary" onClick={() => onNavigate('/app')}>
                {t('landing.createCv')}
              </button>
              <a className="landing-btn landing-btn--secondary" href="#why">
                {t('landing.learnMore')}
              </a>
            </div>
            <ul className="landing-trust">
              <li>{t('landing.trust.fast')}</li>
              <li>{t('landing.trust.noAccount')}</li>
              <li>{t('landing.trust.ats')}</li>
              <li>{t('landing.trust.multilang')}</li>
              <li>{t('landing.trust.school')}</li>
            </ul>
          </div>

          <div className="landing-hero__visual" aria-hidden="true">
            <div className="landing-preview-card landing-preview-card--front">
              <span className="landing-preview-card__badge">{t('landing.preview.classicBadge')}</span>
              <div className="landing-preview-classic">
                <div className="landing-preview-classic__header">
                  <span className="landing-preview-classic__name" />
                  <span className="landing-preview-classic__title" />
                </div>
                <div className="landing-preview-classic__divider" />
                <div className="landing-preview-classic__section">
                  <span className="landing-preview-classic__section-title" />
                  <div className="landing-preview-card__lines landing-preview-card__lines--classic">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="landing-preview-classic__divider" />
                <div className="landing-preview-classic__section">
                  <span className="landing-preview-classic__section-title landing-preview-classic__section-title--wide" />
                  <div className="landing-preview-card__lines landing-preview-card__lines--classic">
                    <span />
                    <span />
                  </div>
                </div>
                <div className="landing-preview-classic__divider" />
                <div className="landing-preview-classic__section">
                  <span className="landing-preview-classic__section-title landing-preview-classic__section-title--narrow" />
                  <div className="landing-preview-card__lines landing-preview-card__lines--classic">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
            <div className="landing-preview-card landing-preview-card--back">
              <span className="landing-preview-card__badge">{t('landing.preview.atsBadge')}</span>
              <div className="landing-preview-card__lines">
                <span />
                <span />
                <span />
              </div>
              <div className="landing-preview-card__lines landing-preview-card__lines--compact">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="landing-preview-chip">
              <FontAwesomeIcon icon={faWandMagicSparkles} />
              <span>{t('landing.preview.customiseChip')}</span>
            </div>
          </div>
        </section>

        <section id="why" className="landing-section">
          <div className="landing-section__intro">
            <p className="landing-eyebrow">{t('landing.sections.whyEyebrow')}</p>
            <h2>{t('landing.sections.whyTitle')}</h2>
            <p>{t('landing.sections.whyLead')}</p>
          </div>
          <div className="landing-feature-grid">
            {featureItems.map((item) => (
              <article key={item.title} className="landing-card">
                <div className="landing-card__icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section landing-section--warm">
          <div className="landing-section__intro">
            <p className="landing-eyebrow">{t('landing.sections.atsEyebrow')}</p>
            <h2>{t('landing.sections.atsTitle')}</h2>
            <p>{t('landing.sections.atsLead')}</p>
          </div>
          <div className="landing-feature-grid">
            {atsItems.map((item) => (
              <article key={item.title} className="landing-card">
                <div className="landing-card__icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section landing-section--warm">
          <div className="landing-section__intro">
            <p className="landing-eyebrow">{t('landing.sections.howEyebrow')}</p>
            <h2>{t('landing.sections.howTitle')}</h2>
            <p>{t('landing.sections.howLead')}</p>
          </div>
          <div className="landing-step-grid">
            {stepItems.map((item) => (
              <article key={item.number} className="landing-step">
                <span className="landing-step__number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section landing-section--seo">
          <div className="landing-section__intro">
            <p className="landing-eyebrow">{t('landing.sections.seoEyebrow')}</p>
            <h2>{t('landing.sections.seoTitle')}</h2>
          </div>
          <div className="landing-seo-copy">
            <p className="landing-seo-copy__lead">{t('landing.seo.lead')}</p>
            <p>{t('landing.seo.paragraph1')}</p>
            <p>{t('landing.seo.paragraph2')}</p>
            <p>{t('landing.seo.paragraph3')}</p>
          </div>
        </section>

        <section className="landing-section">
          <div className="landing-section__intro">
            <p className="landing-eyebrow">{t('landing.sections.faqEyebrow')}</p>
            <h2>{t('landing.sections.faqTitle')}</h2>
          </div>
          <div className="landing-faq">
            {faqItems.map((item) => (
              <article key={item.question} className="landing-faq__item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section landing-cta">
          <div className="landing-cta__panel">
            <h2>{t('landing.final.title')}</h2>
            <p>{t('landing.final.text')}</p>
            <button className="landing-btn landing-btn--primary" onClick={() => onNavigate('/app')}>
              {t('landing.final.cta')}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
