// queries/getProjects.ts
import datoCMSClient from './datoCMSClient';
import { Project } from '../types';
import { FALLBACK_PROJECTS } from "../fallback/fallbackData";
import { DATO_SCHEMA, RawProject } from './schemaMap';
import { normalizeUrl } from '../utils/normalizeUrl';

const GET_PROJECTS = `
  query {
    ${DATO_SCHEMA.roots.projects}(orderBy: title_ASC) {
      title
      description
      techUsed
      image {
        url
      }
    }
  }
`;

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await datoCMSClient.request<{ allProjects: RawProject[] }>(
      GET_PROJECTS
    );

    // If CMS returns empty array, use fallback
    if (!data?.allProjects?.length) {
      console.warn("CMS returned empty projects. Using fallback.");
      return FALLBACK_PROJECTS;
    }

    return data.allProjects
      .map((project) => ({
        ...project,
        image: {
          ...project.image,
          url: normalizeUrl(project.image?.url),
        },
      }))
      .filter((project) => Boolean(project.image?.url));

  } catch (error) {
    console.error("Error fetching projects from CMS, using fallback:", error);
    return FALLBACK_PROJECTS;
  }
}
