import React, { useEffect, useState } from 'react';
import './WorkPermit.css';
import { getWorkPermit } from '../queries/getWorkPermit';
import EmptyState from '../components/EmptyState';
import { WorkPermit as IWorkPermit } from '../types';
import { FaPassport } from 'react-icons/fa';

const formatPermitDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString();
};

const WorkPermit: React.FC = () => {
  const [workPermitData, setWorkPermitData] = useState<IWorkPermit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkPermitData() {
      try {
        const data = await getWorkPermit();
        setWorkPermitData(data);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWorkPermitData();
  }, []);

  if (isLoading) {
    return <div className="work-permit-container">Loading...</div>;
  }

  if (!workPermitData) {
    return (
      <div className="work-permit-container">
        <EmptyState
          title="Work Permit"
          message="Currently pursuing studies and open to opportunities."
          icon={<FaPassport />}
        />
      </div>
    );
  }

  return (
    <div className="work-permit-container">
      <div className="work-permit-card">
        <h2 className="work-permit-headline">Work Permit</h2>
        <p className="work-permit-summary">
          I'm currently on a <strong>{workPermitData.visaStatus}</strong>, which allows me to work in the UK. My visa is valid until <strong>{formatPermitDate(workPermitData.expiryDate)}</strong>, giving me the opportunity to build valuable experience and grow my career here.
        </p>
        <p className="additional-info">{workPermitData.additionalInfo}</p>
      </div>
    </div>
  );
};

export default WorkPermit;
