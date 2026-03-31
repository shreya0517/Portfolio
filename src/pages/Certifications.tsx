import React, { useEffect, useState } from 'react';
import './Certifications.css';
import { Certification } from '../types';
import { getCertifications } from '../queries/getCertifications';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    async function fetchCertifications() {
      try {
        const data = await getCertifications();
        setCertifications(data);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCertifications();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (certifications.length === 0) {
    return <div className="certifications-container">No certifications found.</div>;
  }

  return (
    <div className="certifications-container">
      <div className="certifications-header">
        <p className="certifications-eyebrow">Certifications</p>
        <h2 className="certifications-title">Verified Learning, Real Milestones</h2>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert) => (
          <article
            key={`${cert.title}-${cert.issuedDate}`}
            className="certification-card"
          >
            <div className="certification-image-wrap">
              <div className="certification-badge" aria-hidden="true">
                <FaCertificate />
              </div>
              <p className="certification-icon-label">{cert.iconName || 'certificate'}</p>
            </div>

            <div className="certification-content">
              <h3>{cert.title}</h3>
              {cert.issuer && <p>{cert.issuer}</p>}
              <span className="certification-issued-date">{cert.issuedDate}</span>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certification-link"
                >
                  View credential <FaExternalLinkAlt />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
