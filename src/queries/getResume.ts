import { ClientError } from 'graphql-request';
import datoCMSClient from './datoCMSClient';
import { ResumeItem } from '../types';
import { DATO_SCHEMA, RawResumeItem } from './schemaMap';

const GET_RESUME = `
  query GetAllResumes {
    ${DATO_SCHEMA.roots.resume} {
      title
      file {
        url
      }
    }
  }
`;

export async function getResume(): Promise<ResumeItem | null> {
  try {
    const data = await datoCMSClient.request<{ allResumes: RawResumeItem[] }>(GET_RESUME);

    if (!data?.allResumes?.length) {
      console.warn('CMS returned empty resumes.');
      return null;
    }

    return data.allResumes[0];
  } catch (error) {
    if (error instanceof ClientError) {
      const issueList = error.response.errors?.map((issue) => ({
        code: issue.extensions?.code,
        fieldName: issue.extensions?.fieldName,
        message: issue.message,
      }));

      console.error('DatoCMS resume query failed:', issueList);
    }

    console.error('Error fetching resume:', error);
    return null;
  }
}
