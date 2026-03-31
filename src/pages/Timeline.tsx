import React, { useEffect, useState } from 'react';
import './Timeline.css';
import { TimelineItem } from '../types';
import { getTimeline } from '../queries/getTimeline';
import ProfessionalTimeline, {
  ProfessionalTimelineNode,
} from '../components/ProfessionalTimeline';

const toArray = (value: string[] | string | null | undefined): string[] => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const inferCategory = (title: string): 'education' | 'work' => {
  return title.trim().toLowerCase().includes('internship') ||
    title.trim().toLowerCase().includes('experience')
    ? 'work'
    : 'education';
};

const mapTimelineItemsToJourney = (
  items: TimelineItem[]
): ProfessionalTimelineNode[] => {
  return [...items]
    .map((item) => ({
      title: item.title,
      institution: item.name,
      duration: item.dateRange,
      description:
        toArray(item.summaryPoints)[0] ||
        (toArray(item.techStack).length > 0
          ? `Focus: ${toArray(item.techStack).join(', ')}`
          : 'A meaningful chapter that helped shape my skills and perspective.'),
      category: item.timelineType === 'work' ? 'work' : inferCategory(item.title),
    }));
};

const Timeline: React.FC = () => {
  const [journeyItems, setJourneyItems] = useState<ProfessionalTimelineNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfessionalData() {
      try {
        const allTimelineItems = await getTimeline();

        if (!isMounted) {
          return;
        }

        const normalizedTimelineItems = Array.isArray(allTimelineItems) ? allTimelineItems : [];
        const journeyData = mapTimelineItemsToJourney(normalizedTimelineItems);

        setJourneyItems(journeyData);
        setError(null);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError('Unable to load professional timeline right now.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchProfessionalData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div className="timeline-page__status">Loading professional timeline...</div>;
  }

  if (error) {
    return <div className="timeline-page__status">{error}</div>;
  }

  return (
    <div className="timeline-page">
      <div className="timeline-page__hero">
        <p className="timeline-page__eyebrow">Professional</p>
        <h2 className="timeline-page__title">A Timeline That Grows Like a Tree</h2>
        <p className="timeline-page__intro">
          From school to internship, each chapter branches from the last and shows how
          my learning turned into practical experience.
        </p>
      </div>

      {journeyItems.length === 0 ? (
        <div className="timeline-page__status">No timeline entries available yet.</div>
      ) : (
        <ProfessionalTimeline items={journeyItems} />
      )}
    </div>
  );
};

export default Timeline;
