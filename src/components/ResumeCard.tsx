import React from 'react';
import { FaDownload, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import './ResumeCard.css';

interface ResumeCardProps {
  title: string;
  onOpen: () => void;
  downloadUrl: string;
  thumbnailUrl?: string;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  title,
  onOpen,
  downloadUrl,
  thumbnailUrl,
}) => {
  return (
    <article className="resume-preview-card">
      <div className="resume-preview-card__media">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className="resume-preview-card__image" />
        ) : (
          <div className="resume-preview-card__placeholder">
            <FaFileAlt />
          </div>
        )}
      </div>

      <div className="resume-preview-card__content">
        <p className="resume-preview-card__eyebrow">Resume</p>
        <h2 className="resume-preview-card__title">{title}</h2>
        <p className="resume-preview-card__subtitle">
          Open my resume in a cinematic viewer or download a copy directly.
        </p>

        <div className="resume-preview-card__actions">
          <button
            type="button"
            className="resume-preview-card__button resume-preview-card__button--primary"
            onClick={onOpen}
          >
            <FaExternalLinkAlt />
            Open File
          </button>
          <a className="resume-preview-card__button" href={downloadUrl} download>
            <FaDownload />
            Download
          </a>
        </div>
      </div>
    </article>
  );
};

export default ResumeCard;
