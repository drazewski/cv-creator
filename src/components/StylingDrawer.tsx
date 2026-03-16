import { useTranslation } from 'react-i18next';
import { useSettingsStore, FONTS, FontKey } from '../store/settingsStore';
import { Analytics } from '../lib/analytics';
import './StylingDrawer.css';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="sd-row">
      <span className="sd-row__label">{label}</span>
      <div className="sd-row__control">{children}</div>
    </div>
  );
}

function SizeSlider({
  label,
  value,
  min,
  max,
  onChange,
}: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <Row label={label}>
      <div className="sd-slider-group">
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="sd-slider"
        />
        <span className="sd-slider__value">{value}px</span>
      </div>
    </Row>
  );
}

function PercentSlider({
  label,
  value,
  min,
  max,
  onChange,
}: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <Row label={label}>
      <div className="sd-slider-group">
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="sd-slider"
        />
        <span className="sd-slider__value">{value}%</span>
      </div>
    </Row>
  );
}

function SpacingSlider({
  label,
  value,
  onChange,
  min = 1,
  max = 2.0,
}: { label: string; value: number; onChange: (value: number) => void; min?: number; max?: number }) {
  return (
    <Row label={label}>
      <div className="sd-slider-group">
        <input
          type="range"
          min={min}
          max={max}
          step={0.05}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="sd-slider"
        />
        <span className="sd-slider__value">{value.toFixed(2)}</span>
      </div>
    </Row>
  );
}

function BoolRow({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return (
    <Row label={label}>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`sd-toggle ${value ? 'sd-toggle--on' : ''}`}
      >
        <span className="sd-toggle__thumb" />
      </button>
    </Row>
  );
}

export default function StylingDrawer() {
  const { t } = useTranslation();
  const { styling, setStyling, layoutId } = useSettingsStore();

  return (
    <div className="styling-drawer">
      <h3 className="sd-section-title">{t('styling.colors')}</h3>

      <Row label={t('styling.primary')}>
        <input
          type="color"
          value={styling.primaryColor}
          onChange={(e) => { Analytics.colorChanged(e.target.value); setStyling('primaryColor', e.target.value); }}
          className="sd-color"
        />
        <span className="sd-color__hex">{styling.primaryColor}</span>
      </Row>

      <Row label={t('styling.accent')}>
        <input
          type="color"
          value={styling.accentColor}
          onChange={(e) => { Analytics.colorChanged(e.target.value); setStyling('accentColor', e.target.value); }}
          className="sd-color"
        />
        <span className="sd-color__hex">{styling.accentColor}</span>
      </Row>

      <div className="sd-divider" />
      <h3 className="sd-section-title">{t('styling.font')}</h3>

      <Row label={t('styling.typeface')}>
        <select
          value={styling.font}
          onChange={(e) => setStyling('font', e.target.value as FontKey)}
          className="sd-select"
        >
          {(Object.entries(FONTS) as [FontKey, { label: string; css: string }][]).map(([key, font]) => (
            <option key={key} value={key} style={{ fontFamily: font.css }}>{font.label}</option>
          ))}
        </select>
      </Row>

      <div className="sd-divider" />
      <h3 className="sd-section-title">{t('styling.sizes')}</h3>

      {layoutId === 'us-single' ? (
        <>
          <SizeSlider label={t('styling.name')} value={styling.fontSizeUSName} min={18} max={48}
            onChange={(value) => setStyling('fontSizeUSName', value)} />
          <SizeSlider label={t('styling.titleTagline')} value={styling.fontSizeUSTitle} min={10} max={22}
            onChange={(value) => setStyling('fontSizeUSTitle', value)} />
          <SizeSlider label={t('styling.contactItems')} value={styling.fontSizeUSContact} min={9} max={16}
            onChange={(value) => setStyling('fontSizeUSContact', value)} />
          <SizeSlider label={t('styling.sectionTitles')} value={styling.fontSizeTitle} min={9} max={20}
            onChange={(value) => setStyling('fontSizeTitle', value)} />
          <SizeSlider label={t('styling.bodyText')} value={styling.fontSizeBody} min={10} max={18}
            onChange={(value) => setStyling('fontSizeBody', value)} />
          <SizeSlider label={t('styling.photoSize')} value={styling.photoSizeUS} min={60} max={180}
            onChange={(value) => setStyling('photoSizeUS', value)} />
          <PercentSlider label={t('styling.photoRadius')} value={styling.photoRadius} min={0} max={50}
            onChange={(value) => setStyling('photoRadius', value)} />
        </>
      ) : (
        <>
          <SizeSlider label={t('styling.name')} value={styling.fontSizeSidebarName} min={14} max={36}
            onChange={(value) => setStyling('fontSizeSidebarName', value)} />
          <SizeSlider label={t('styling.sidebarText')} value={styling.fontSizeSidebar} min={10} max={16}
            onChange={(value) => setStyling('fontSizeSidebar', value)} />
          <SizeSlider label={t('styling.sectionTitles')} value={styling.fontSizeTitle} min={9} max={20}
            onChange={(value) => setStyling('fontSizeTitle', value)} />
          <SizeSlider label={t('styling.bodyText')} value={styling.fontSizeBody} min={10} max={18}
            onChange={(value) => setStyling('fontSizeBody', value)} />
          <SizeSlider label={t('styling.photoSize')} value={styling.photoSizeClassic} min={60} max={200}
            onChange={(value) => setStyling('photoSizeClassic', value)} />
          <PercentSlider label={t('styling.photoRadius')} value={styling.photoRadius} min={0} max={50}
            onChange={(value) => setStyling('photoRadius', value)} />
        </>
      )}

      <div className="sd-divider" />
      <h3 className="sd-section-title">{t('styling.spacing')}</h3>

      {layoutId === 'us-single' ? (
        <>
          <SpacingSlider label={t('styling.headerSpacing')} value={styling.lineHeightUSHeader}
            onChange={(value) => setStyling('lineHeightUSHeader', value)} />
          <SpacingSlider label={t('styling.bodySpacing')} value={styling.lineHeightBody}
            onChange={(value) => setStyling('lineHeightBody', value)} />
        </>
      ) : (
        <>
          <SpacingSlider label={t('styling.sidebarSpacing')} value={styling.lineHeightSidebar}
            onChange={(value) => setStyling('lineHeightSidebar', value)} />
          <SpacingSlider label={t('styling.bodySpacing')} value={styling.lineHeightBody}
            onChange={(value) => setStyling('lineHeightBody', value)} />
        </>
      )}

      {layoutId === 'us-single' && (
        <>
          <div className="sd-divider" />
          <h3 className="sd-section-title">{t('styling.options')}</h3>
          <BoolRow label={t('styling.contactIcons')} value={styling.showContactIcons}
            onChange={(value) => setStyling('showContactIcons', value)} />
        </>
      )}
    </div>
  );
}
