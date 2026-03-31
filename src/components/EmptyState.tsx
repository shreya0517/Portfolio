import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon,
  className = '',
}) => {
  return (
    <div className={`empty-state ${className}`.trim()}>
      {icon && <div className="empty-state-icon">{icon}</div>}
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-message">{message}</p>
    </div>
  );
};

export default EmptyState;
