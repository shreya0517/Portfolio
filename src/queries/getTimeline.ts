// queries/getTimeline.ts
import datoCMSClient from './datoCMSClient';
import { TimelineItem } from '../types';
import { DATO_SCHEMA, RawTimelineItem } from './schemaMap';

const GET_TIMELINE = `
  query GetAllTimelines {
    ${DATO_SCHEMA.roots.timeline}(orderBy: _createdAt_DESC) {
      timelineType: timelinetype
      name
      title
      techStack: techstack
      summaryPoints: summarypoints
      dateRange: daterange
    }
  }
`;

export async function getTimeline(): Promise<TimelineItem[]> {
  try {
    const data = await datoCMSClient.request<{ allTimelines: RawTimelineItem[] }>(
      GET_TIMELINE
    );

    if (!data?.allTimelines?.length) {
      console.warn('CMS returned empty timeline.');
      return [];
    }

    return data.allTimelines;
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return [];
  }
}
