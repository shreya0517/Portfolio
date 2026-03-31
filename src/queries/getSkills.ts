// queries/getSkills.ts (was getTimeline.ts in your comment)
import datoCMSClient from './datoCMSClient';
import { Skill } from '../types';
import { FALLBACK_SKILLS } from '../fallback/fallbackData';
import { DATO_SCHEMA, RawSkill } from './schemaMap';

const GET_SKILLS = `
{
  ${DATO_SCHEMA.roots.skills}(orderBy: category_ASC) {
    name
    category
    description
    icon
  }
}
`;

export async function getSkills(): Promise<Skill[]> {
  try {
    const data = await datoCMSClient.request<{ allSkills: RawSkill[] }>(GET_SKILLS);

    if (!data?.allSkills?.length) {
      console.warn('CMS returned empty skills. Using fallback.');
      return FALLBACK_SKILLS;
    }

    return data.allSkills;
  } catch (error) {
    console.error('Error fetching skills, using fallback:', error);
    return FALLBACK_SKILLS;
  }
}
