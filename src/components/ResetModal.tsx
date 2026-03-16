import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './ResetModal.css';

interface Props {
  onResetLayout: () => void;
  onResetData: () => void;
  onResetAll: () => void;
  onClose: () => void;
}

export default function ResetModal({ onResetLayout, onResetData, onResetAll, onClose }: Props) {
  const { t } = useTranslation();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="reset-overlay" onMouseDown={onClose}>
      <div className="reset-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="reset-modal__close" onClick={onClose} title={t('resetModal.close')}>
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h2 className="reset-modal__title">{t('resetModal.title')}</h2>
        <p className="reset-modal__subtitle">{t('resetModal.subtitle')}</p>

        <div className="reset-modal__options">
          <div className="reset-modal__option">
            <div className="reset-modal__option-text">
              <strong>{t('resetModal.layoutStyling')}</strong>
              <span>{t('resetModal.layoutStylingDescription')}</span>
            </div>
            <button className="reset-modal__btn reset-modal__btn--warn" onClick={onResetLayout}>
              {t('resetModal.resetLayout')}
            </button>
          </div>

          <div className="reset-modal__option">
            <div className="reset-modal__option-text">
              <strong>{t('resetModal.cvData')}</strong>
              <span>{t('resetModal.cvDataDescription')}</span>
            </div>
            <button className="reset-modal__btn reset-modal__btn--warn" onClick={onResetData}>
              {t('resetModal.resetData')}
            </button>
          </div>

          <div className="reset-modal__option reset-modal__option--danger">
            <div className="reset-modal__option-text">
              <strong>{t('resetModal.everything')}</strong>
              <span>{t('resetModal.everythingDescription')}</span>
            </div>
            <button className="reset-modal__btn reset-modal__btn--danger" onClick={onResetAll}>
              {t('resetModal.resetAll')}
            </button>
          </div>
        </div>

        <button className="reset-modal__cancel" onClick={onClose}>{t('actions.cancel')}</button>
      </div>
    </div>
  );
}
