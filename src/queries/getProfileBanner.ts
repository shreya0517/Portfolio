// queries/getProfileBanner.ts
import datoCMSClient from './datoCMSClient';
import { ProfileBanner } from '../types';
import { FALLBACK_PROFILE_BANNER } from '../fallback/fallbackData';
import { DATO_SCHEMA, RawProfileBanner } from './schemaMap';
import { normalizeUrl } from '../utils/normalizeUrl';

const GET_PROFILE_BANNER = `
  query {
    ${DATO_SCHEMA.roots.profileBanner} {
      backgroundImage {
        url
      }
      headline
      resumeLink {
        url
      }
      linkedinLink
      profileSummary
    }
  }
`;

export async function getProfileBanner(): Promise<ProfileBanner> {
  try {
    const data = await datoCMSClient.request<{ profilebanner: RawProfileBanner }>(
      GET_PROFILE_BANNER
    );

    if (!data?.profilebanner) {
      console.warn('CMS returned no profilebanner. Using fallback.');
      return FALLBACK_PROFILE_BANNER;
    }

    return {
      ...data.profilebanner,
      linkedinLink: normalizeUrl(data.profilebanner.linkedinLink),
      resumeLink: {
        ...data.profilebanner.resumeLink,
        url: normalizeUrl(data.profilebanner.resumeLink?.url),
      },
    };
  } catch (error) {
    console.error('Error fetching profile banner, using fallback:', error);
    return FALLBACK_PROFILE_BANNER;
  }
}
