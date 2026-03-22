import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useFitText } from '../hooks/useFitText';
import './EditableText.css';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  dark?: boolean;
  href?: string;
  hrefTarget?: '_blank' | '_self';
  stripProtocol?: boolean;
  fitLine?: boolean;
  onRemove?: () => void;
}

export default function EditableText({
  value,
  onChange,
  placeholder,
  multiline = false,
  dark = false,
  href,
  hrefTarget,
  stripProtocol = false,
  fitLine = false,
  onRemove,
}: EditableTextProps) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resolvedPlaceholder = placeholder ?? t('editable.placeholder');
  const displayValue = stripProtocol ? value.replace(/^https?:\/\//, '') : value;
  const { ref: fitRef, fontSize: fitFontSize } = useFitText(displayValue, fitLine && !editing);

  useEffect(() => { setDraft(value); }, [value]);

  useEffect(() => {
    if (!editing) return;
    const element = multiline ? textareaRef.current : inputRef.current;
    if (element) {
      element.focus();
      const length = element.value.length;
      element.setSelectionRange(length, length);
    }
  }, [editing, multiline]);

  useEffect(() => {
    if (!editing || !multiline || !textareaRef.current) return;

    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [draft, editing, multiline]);

  const confirm = () => {
    const trimmed = draft.trim();
    if (trimmed) onChange(trimmed);
    setEditing(false);
  };

  const cancel = () => setEditing(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) { e.preventDefault(); confirm(); }
    if (e.key === 'Escape') cancel();
  };

  const inputClassName = `editable-text__input${multiline ? ' editable-text__input--multiline' : ''}${dark ? ' editable-text__input--dark' : ''}`;

  if (editing) {
    return multiline ? (
      <textarea
        ref={textareaRef}
        className={inputClassName}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={confirm}
        placeholder={resolvedPlaceholder}
        rows={2}
      />
    ) : (
      <input
        ref={inputRef}
        type="text"
        className={inputClassName}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={confirm}
        placeholder={resolvedPlaceholder}
      />
    );
  }

  const valueContent = displayValue || <em className="editable-text__empty">{resolvedPlaceholder}</em>;

  const wrapperClassName = [
    'editable-text',
    dark ? 'editable-text--dark' : '',
    fitLine ? 'editable-text--fit-line' : '',
  ].filter(Boolean).join(' ');

  const enterEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraft(value);
    setEditing(true);
  };

  return (
    <span ref={fitLine ? fitRef : undefined} className={wrapperClassName} style={fitLine && fitFontSize ? { fontSize: fitFontSize } : undefined}>
      {href ? (
        <a
          href={href}
          target={hrefTarget}
          rel={hrefTarget === '_blank' ? 'noopener noreferrer' : undefined}
          className="editable-text__value editable-text__link"
          onClick={enterEdit}
        >
          {valueContent}
        </a>
      ) : (
        <span className="editable-text__value" onClick={enterEdit}>{valueContent}</span>
      )}
      {onRemove && (
        <span className="editable-text__actions">
          <button
            type="button"
            className="editable-text__btn editable-text__btn--remove"
            title={t('actions.remove')}
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </span>
      )}
    </span>
  );
}
