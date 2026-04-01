import React, { useEffect, useState } from 'react';
import './Recommendations.css';
import EmptyState from '../components/EmptyState';
import { Recommendation } from '../types';
import { FaHandsHelping } from 'react-icons/fa';
import { getRecommendations } from '../queries/getRecommendations';
import profilePic from '../images/portfolio/profiles/contact-profile.jpg';

const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchRecommendations() {
      try {
        const items = await getRecommendations();

        if (!isMounted) {
          return;
        }

        setRecommendations(Array.isArray(items) ? items : []);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchRecommendations();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div className="timeline-container">Loading recommendations...</div>;
  }

  if (!recommendations.length) {
    return (
      <div className="timeline-container">
        <EmptyState
          title="Recommendations"
          message="Recommendations coming soon."
          icon={<FaHandsHelping />}
          className="recommendation-empty-state"
        />
      </div>
    );
  }

  return (
    <div className="timeline-container">
      {recommendations.map((recommendation) => (
        <div
          className="recommendation-card"
          key={`${recommendation.name}-${recommendation.date}`}
        >
          <div className="recommendation-header">
            {recommendation.profileImage && (
              <img
                src={recommendation.profileImage}
                alt={recommendation.name}
                className="profile-pic"
                onError={(event) => {
                  event.currentTarget.src = profilePic;
                }}
              />
            )}
            <div>
              <h3>{recommendation.name}</h3>
              <p>{recommendation.role}</p>
              {recommendation.company && <p>{recommendation.company}</p>}
              <p className="date">{recommendation.date}</p>
            </div>
          </div>
          <div className="recommendation-body">
            {(recommendation.body.length ? recommendation.body : ['Recommendation details coming soon.']).map((paragraph, index) => (
              <p key={`${recommendation.name}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
