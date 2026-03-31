import React from 'react';
import {
  FaBookOpen,
  FaBriefcase,
  FaGraduationCap,
  FaSchool,
  FaUniversity,
} from 'react-icons/fa';
import './ProfessionalTimeline.css';

export interface ProfessionalTimelineNode {
  title: string;
  institution: string;
  duration: string;
  description: string;
  category?: 'education' | 'work';
}

const iconByTitle = (title: string, category?: 'education' | 'work') => {
  const normalizedTitle = title.trim().toLowerCase();

  if (
    category === 'work' ||
    normalizedTitle.includes('internship') ||
    normalizedTitle.includes('experience')
  ) {
    return <FaBriefcase />;
  }

  if (normalizedTitle.includes('college')) {
    return <FaUniversity />;
  }

  if (normalizedTitle.includes('high school')) {
    return <FaGraduationCap />;
  }

  if (normalizedTitle.includes('school')) {
    return <FaSchool />;
  }

  return <FaBookOpen />;
};

interface ProfessionalTimelineProps {
  items: ProfessionalTimelineNode[];
}

const ProfessionalTimeline: React.FC<ProfessionalTimelineProps> = ({ items }) => {
  return (
    <div className="professional-timeline" aria-label="Professional journey timeline">
      <div className="professional-timeline__trunk" />

      {items.map((item, index) => {
        const isLeft = index % 2 === 0;

        return (
          <article
            key={`${item.title}-${item.institution}-${item.duration}-${index}`}
            className={`professional-timeline__item ${isLeft ? 'is-left' : 'is-right'}`}
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <div className="professional-timeline__branch" />

            <div className="professional-timeline__node">
              <span className="professional-timeline__icon">
                {iconByTitle(item.title, item.category)}
              </span>
            </div>

            <div className="professional-timeline__card">
              <span className="professional-timeline__duration">{item.duration}</span>
              <h3>{item.title}</h3>
              <p className="professional-timeline__institution">{item.institution}</p>
              <p className="professional-timeline__description">{item.description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ProfessionalTimeline;
