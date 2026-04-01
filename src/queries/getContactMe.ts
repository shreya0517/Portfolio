import datoCMSClient from './datoCMSClient';
import { ContactMe } from '../types';
import { FALLBACK_CONTACT } from '../fallback/fallbackData';
import { DATO_SCHEMA, RawContactMe } from './schemaMap';
import { normalizeUrl } from '../utils/normalizeUrl';

const GET_CONTACT_ME = `
  query {
    ${DATO_SCHEMA.roots.contactMe} {
      profilePicture {
        url
      }
      name
      title
      summary
      linkedinLink
      email
      phoneNumber
    }
  }
`;

export async function getContactMe(): Promise<ContactMe> {
  try {
    const data = await datoCMSClient.request<{ contactMe: RawContactMe }>(
      GET_CONTACT_ME
    );

    if (!data?.contactMe) {
      console.warn('CMS returned no contactMe. Using fallback.');
      return FALLBACK_CONTACT;
    }

    return {
      ...data.contactMe,
      profilePicture: data.contactMe.profilePicture
        ? {
            ...data.contactMe.profilePicture,
            url: normalizeUrl(data.contactMe.profilePicture.url),
          }
        : data.contactMe.profilePicture,
      linkedinLink: normalizeUrl(data.contactMe.linkedinLink),
    };
  } catch (error) {
    console.error('Error fetching contactMe, using fallback:', error);
    return FALLBACK_CONTACT;
  }
}
