import { ClientError } from 'graphql-request';
import datoCMSClient from './datoCMSClient';
import { Certification } from '../types';
import { FALLBACK_CERTIFICATIONS } from '../fallback/fallbackData';
import { DATO_SCHEMA, RawCertification } from './schemaMap';

const GET_CERTIFICATIONS = `
  query GetAllCertifications {
    allCertifications: ${DATO_SCHEMA.roots.certification} {
      title
      issuer
      issueddate
      link {
        url
      }
      iconname
    }
  }
`;

export async function getCertifications(): Promise<Certification[]> {
  try {
    const data = await datoCMSClient.request<{ allCertifications: RawCertification[] }>(
      GET_CERTIFICATIONS
    );

    if (!data?.allCertifications?.length) {
      console.warn('CMS returned empty certifications. Using fallback.');
      return FALLBACK_CERTIFICATIONS;
    }

    return data.allCertifications.map((cert) => ({
      title: cert.title,
      issuer: cert.issuer,
      issuedDate: cert.issueddate,
      link: cert.link?.url ?? '',
      iconName: cert.iconname,
    }));
  } catch (error) {
    if (error instanceof ClientError) {
      const issueList = error.response.errors?.map((issue) => ({
        code: issue.extensions?.code,
        fieldName: issue.extensions?.fieldName,
        message: issue.message,
      }));

      console.error('DatoCMS certification query failed:', issueList);
    }

    console.error('Error fetching certifications, using fallback:', error);
    return FALLBACK_CERTIFICATIONS;
  }
}
