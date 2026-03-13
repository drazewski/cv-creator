import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import EditableText from './EditableText';
import './CustomSection.css';

interface CustomSectionProps {
  title: string;
  content: string;
  dark?: boolean;
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
  onRemove: () => void;
}

export default function CustomSection({
  title,
  content,
  dark = false,
  onChangeTitle,
  onChangeContent,
  onRemove,
}: CustomSectionProps) {
  const { t } = useTranslation();

  return (
    <div className={`custom-section${dark ? ' custom-section--dark' : ''}`}>
      <div className="custom-section__header">
        <h2 className={dark ? 'sidebar__section-title' : 'cv-section__title'}>
          <EditableText value={title} onChange={onChangeTitle} dark={dark} />
        </h2>
        <button
          type="button"
          className="custom-section__remove"
          title={t('actions.removeSection')}
          onClick={onRemove}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="custom-section__content">
        <EditableText
          value={content}
          onChange={onChangeContent}
          multiline
          dark={dark}
          placeholder={t('editable.customSectionPlaceholder')}
        />
      </div>
    </div>
  );
}
