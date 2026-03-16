import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faRotateLeft, faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import USLayout from './USLayout';
import DrawerTabs from './DrawerTabs';
import ResetModal from './ResetModal';
import UILanguageSelector from './UILanguageSelector';
import BrandLogo from './BrandLogo';
import { useSettingsStore, FONTS } from '../store/settingsStore';
import { useCvStore } from '../store/cvStore';
import { Analytics } from '../lib/analytics';
import { setDocumentMetadata } from '../lib/metadata';
import { getSupportedLanguage } from '../i18n/languages';

const CV_WIDTH = 794;

interface EditorPageProps {
  onNavigate: (path: string) => void;
}

export default function EditorPage({ onNavigate }: EditorPageProps) {
  const { t, i18n } = useTranslation();
  const { styling, resetLayout, layoutId } = useSettingsStore();
  const { resetData, data: { name: userName } } = useCvStore();
  const activeLanguage = getSupportedLanguage(i18n.resolvedLanguage ?? i18n.language);
  const scalerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [showReset, setShowReset] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    setDocumentMetadata(
      t('editor.metaTitle'),
      t('editor.metaDescription'),
    );
  }, [i18n.resolvedLanguage, t]);

  useEffect(() => {
    const update = () => {
      const vw = document.documentElement.clientWidth;
      setScale(Math.min(1, vw / CV_WIDTH));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const cvVars = {
    '--color-primary': styling.primaryColor,
    '--color-accent': styling.accentColor,
    '--font-size-sidebar-name': `${styling.fontSizeSidebarName}px`,
    '--font-size-sidebar': `${styling.fontSizeSidebar}px`,
    '--font-size-title': `${styling.fontSizeTitle}px`,
    '--font-size-body': `${styling.fontSizeBody}px`,
    '--line-height-sidebar': styling.lineHeightSidebar,
    '--line-height-body': styling.lineHeightBody,
    '--font-size-us-name': `${styling.fontSizeUSName}px`,
    '--font-size-us-title': `${styling.fontSizeUSTitle}px`,
    '--font-size-us-contact': `${styling.fontSizeUSContact}px`,
    '--line-height-us-header': styling.lineHeightUSHeader,
    '--photo-size-classic': `${styling.photoSizeClassic}px`,
    '--photo-size-us': `${styling.photoSizeUS}px`,
    '--photo-radius': `${styling.photoRadius}%`,
    fontFamily: FONTS[styling.font].css,
  } as React.CSSProperties;

  return (
    <div className={`cv-page cv-page--${layoutId}${preview ? ' is-preview' : ''}`}>
      <header className="cv-header">
        <div className="cv-toolbar" style={{ width: CV_WIDTH * scale }}>
          <BrandLogo
            href="/"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('/');
            }}
          />
          <div className="cv-toolbar__actions">
            <UILanguageSelector />
            <button className="cv-toolbar__reset" onClick={() => setShowReset(true)} title={t('app.reset')}>
              <FontAwesomeIcon icon={faRotateLeft} />
              <span className="cv-toolbar__btn-label"> {t('app.reset')}</span>
            </button>
            <button
              className={`cv-toolbar__preview${preview ? ' cv-toolbar__preview--active' : ''}`}
              onClick={() => setPreview((value) => !value)}
              title={preview ? t('app.editMode') : t('app.preview')}
            >
              <FontAwesomeIcon icon={preview ? faPenToSquare : faEye} />
              <span className="cv-toolbar__btn-label">{preview ? ` ${t('app.editMode')}` : ` ${t('app.preview')}`}</span>
            </button>
            <button
              className="cv-toolbar__export"
              onClick={() => {
                Analytics.cvExported();
                const prevTitle = document.title;
                const slug = userName.trim().toLowerCase().replace(/\s+/g, '-') || 'my';
                document.title = `${slug}-cv`;
                window.print();
                document.title = prevTitle;
              }}
              title={t('app.exportPdf')}
            >
              <FontAwesomeIcon icon={faFilePdf} />
              <span className="cv-toolbar__btn-label"> {t('app.exportPdf')}</span>
            </button>
          </div>
        </div>
      </header>
      <div className="cv-scaler" ref={scalerRef}>
        <div
          className="cv-scaler__inner"
          style={{
            transform: scale < 1 ? `scale(${scale})` : undefined,
            marginBottom: scale < 1 ? `${(scale - 1) * 1123}px` : undefined,
          }}
        >
          <div className={`cv-layout ${layoutId === 'classic' ? 'cv-layout--classic' : 'cv-layout--us'}`} style={cvVars}>
            {layoutId === 'classic' ? (
              <>
                <Sidebar />
                <MainContent />
              </>
            ) : (
              <USLayout />
            )}
          </div>
        </div>
      </div>
      <DrawerTabs />
      {showReset && (
        <ResetModal
          onResetLayout={() => {
            Analytics.resetClicked();
            resetLayout();
            setShowReset(false);
          }}
          onResetData={() => {
            Analytics.resetClicked();
            resetData(activeLanguage);
            setShowReset(false);
          }}
          onResetAll={() => {
            Analytics.resetClicked();
            resetLayout();
            resetData(activeLanguage);
            setShowReset(false);
          }}
          onClose={() => setShowReset(false)}
        />
      )}
    </div>
  );
}
