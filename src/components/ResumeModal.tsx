import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './ResumeModal.css';

interface ResumeModalProps {
  isOpen: boolean;
  title: string;
  previewUrl: string;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  title,
  previewUrl,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="resume-modal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="resume-modal__backdrop" onClick={onClose} />
      <div className="resume-modal__panel">
        <button
          type="button"
          className="resume-modal__close"
          onClick={onClose}
          aria-label="Close resume viewer"
        >
          <FaTimes />
        </button>

        <div className="resume-modal__frame-wrap">
          <iframe title={title} src={previewUrl} className="resume-modal__frame" />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
