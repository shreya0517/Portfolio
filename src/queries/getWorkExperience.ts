import { ClientError } from 'graphql-request';
import datoCMSClient from './datoCMSClient';
import { ExperienceItem } from '../types';
import {
  DATO_SCHEMA,
  RawWorkExperience,
  normalizeWorkExperience,
} from './schemaMap';

const GET_WORK_EXPERIENCE = `
  query GetAllWorkExperiences {
    ${DATO_SCHEMA.roots.work_experience}(orderBy: _createdAt_DESC) {
      id
      company
      role
      location
      startDate
      endDate
      isCurrentRole
      summaryPoints
      techStack
    }
  }
`;

export async function getWorkExperience(): Promise<ExperienceItem[]> {
  try {
    const data = await datoCMSClient.request<{
      allWorkExperiences: RawWorkExperience[];
    }>(GET_WORK_EXPERIENCE);

    console.log('DatoCMS work experience response:', data?.allWorkExperiences);

    if (!data?.allWorkExperiences?.length) {
      console.warn('CMS returned empty workExperience.');
      return [];
    }

    return data.allWorkExperiences.map(normalizeWorkExperience);
  } catch (error) {
    if (error instanceof ClientError) {
      const issueList = error.response.errors?.map((issue) => ({
        code: issue.extensions?.code,
        fieldName: issue.extensions?.fieldName,
        message: issue.message,
      }));

      console.error('DatoCMS work experience query failed:', issueList);
    }

    console.error('Error fetching work experience:', error);
    return [];
  }
}
