import React, { useEffect, useState } from 'react';
import './WorkExperience.css';
import EmptyState from '../components/EmptyState';
import { getWorkExperience } from '../queries/getWorkExperience';
import { ExperienceItem } from '../types';
import { FaBriefcase } from 'react-icons/fa';

const WorkExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchWorkExperiences() {
      try {
        const items = await getWorkExperience();

        if (!isMounted) {
          return;
        }

        setExperiences(
          Array.isArray(items)
            ? items.filter((item) => item?.id && item?.role && item?.company)
            : []
        );
        setError(null);
      } catch (fetchError) {
        if (!isMounted) {
          return;
        }

        console.error('Error fetching work experiences:', fetchError);
        setError('Unable to load experience right now.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchWorkExperiences();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="experience-page">
      <div className="experience-hero">
        <p className="experience-eyebrow">Experience</p>
        <h2 className="experience-title">Work That Shaped My Craft</h2>
        <p className="experience-intro">
          A quick look at the roles, teams, and products that helped me grow as a
          developer.
        </p>
      </div>

      {isLoading && <div className="experience-status">Loading experience...</div>}

      {!isLoading && error && <div className="experience-status">{error}</div>}

      {!isLoading && !error && experiences.length === 0 && (
        <div className="experience-empty-wrap">
          <EmptyState
            title="Experience"
            message="Professional experience is being updated. Check back soon for the latest roles and projects."
            icon={<FaBriefcase />}
          />
        </div>
      )}

      {!isLoading && !error && experiences.length > 0 && (
        <div className="experience-grid">
          {experiences.map((experience) => (
            <article className="experience-card" key={experience.id}>
              <span className="experience-duration">{experience.duration}</span>
              <h3>{experience.role}</h3>
              <p className="experience-company">{experience.company}</p>
              <p className="experience-description">{experience.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkExperience;
