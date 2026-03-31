// queries/getWorkPermit.ts
import datoCMSClient from './datoCMSClient';
import { WorkPermit } from '../types';
import { DATO_SCHEMA, RawWorkPermit } from './schemaMap';

const GET_WORK_PERMIT = `
  query {
    ${DATO_SCHEMA.roots.workPermit} {
      visaStatus
      expiryDate
      summary
      additionalInfo
    }
  }
`;

export async function getWorkPermit(): Promise<WorkPermit | null> {
  try {
    const data = await datoCMSClient.request<{ workPermit: RawWorkPermit }>(
      GET_WORK_PERMIT
    );

    if (!data?.workPermit) {
      console.warn('CMS returned no workPermit.');
      return null;
    }

    const hasWorkPermitContent = Object.values(data.workPermit).some((value) =>
      Boolean(value?.toString().trim())
    );

    if (!hasWorkPermitContent) {
      console.warn('CMS returned an empty workPermit object.');
      return null;
    }

    return data.workPermit;
  } catch (error) {
    console.error('Error fetching work permit:', error);
    return null;
  }
}
