import React, { useEffect, useState } from 'react';
import './Resume.css';
import { getResume } from '../queries/getResume';
import { ResumeItem } from '../types';
import ResumeCard from '../components/ResumeCard';
import ResumeModal from '../components/ResumeModal';

const Resume: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchResume() {
      try {
        const data = await getResume();

        if (isMounted) {
          setResumeData(data);
          setError(null);
        }
      } catch (fetchError) {
        if (isMounted) {
          console.error('Unable to load resume:', fetchError);
          setError('Unable to load resume right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchResume();

    return () => {
      isMounted = false;
    };
  }, []);

  const envResumeUrl = process.env.REACT_APP_RESUME_URL?.trim() ?? '';

  if (isLoading) {
    return <div className="resume-page">Loading resume...</div>;
  }

  if (error) {
    return <div className="resume-page">{error}</div>;
  }

  if (!resumeData && !envResumeUrl) {
    return <div className="resume-page">Resume is not available right now.</div>;
  }

  const resumeUrl = envResumeUrl || resumeData?.file.url || '';
  const isAbsoluteResumeUrl = /^https?:\/\//i.test(resumeUrl);
  const canPreviewInline = /\.pdf($|\?)/i.test(resumeUrl);
  const absoluteResumeUrl = isAbsoluteResumeUrl
    ? resumeUrl
    : `${window.location.origin}${resumeUrl}`;
  const modalPreviewUrl = canPreviewInline
    ? resumeUrl
    : isAbsoluteResumeUrl
      ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(resumeUrl)}`
      : `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
          absoluteResumeUrl
        )}`;
  const resumeTitle = resumeData?.title || 'Shreya Garg Resume';

  return (
    <div className="resume-page">
      <ResumeCard
        title={resumeTitle}
        onOpen={() => setIsModalOpen(true)}
        downloadUrl={resumeUrl}
      />

      <ResumeModal
        isOpen={isModalOpen}
        title={resumeTitle}
        previewUrl={modalPreviewUrl}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Resume;
