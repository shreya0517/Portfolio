import React, { useEffect, useState } from 'react';
import './Certifications.css';
import { Certification } from '../types';
import { getCertifications } from '../queries/getCertifications';

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
          <a
            href={cert.link}
            key={`${cert.title}-${cert.issuedDate}`}
            target="_blank"
            rel="noopener noreferrer"
            className="certification-card"
          >
            <div className="certification-image-wrap">
              <img
                src={cert.link}
                alt={cert.title}
                className="certification-image"
                loading="lazy"
              />
            </div>

            <div className="certification-content">
              <h3>{cert.title}</h3>
              {cert.issuer && <p>{cert.issuer}</p>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
