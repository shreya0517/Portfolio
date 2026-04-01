import { ClientError } from 'graphql-request';
import datoCMSClient from './datoCMSClient';
import { Recommendation } from '../types';
import { DATO_SCHEMA, RawRecommendation } from './schemaMap';
import { normalizeUrl } from '../utils/normalizeUrl';

const GET_RECOMMENDATIONS = `
  query GetAllRecommendations {
    ${DATO_SCHEMA.roots.recommendation}(orderBy: date_DESC) {
      name
      role
      company
      date
      content
      profileImage: image {
        url
      }
    }
  }
`;

const toParagraphs = (value: string | null | undefined): string[] =>
  value
    ?.split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean) ?? [];

export async function getRecommendations(): Promise<Recommendation[]> {
  try {
    const data = await datoCMSClient.request<{ allRecommendations: RawRecommendation[] }>(
      GET_RECOMMENDATIONS
    );

    if (!data?.allRecommendations?.length) {
      console.warn('CMS returned empty recommendations.');
      return [];
    }

    return data.allRecommendations.map((item) => ({
      name: item.name,
      role: item.role,
      company: item.company,
      date: item.date,
      body: toParagraphs(item.content),
      profileImage: normalizeUrl(item.profileImage?.url),
    }));
  } catch (error) {
    if (error instanceof ClientError) {
      const issueList = error.response.errors?.map((issue) => ({
        code: issue.extensions?.code,
        fieldName: issue.extensions?.fieldName,
        message: issue.message,
      }));

      console.error('DatoCMS recommendations query failed:', issueList);
    }

    console.error('Error fetching recommendations:', error);
    return [];
  }
}
