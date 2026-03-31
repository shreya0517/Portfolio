import {
  BlogPost,
  BookItem,
  ContactMe,
  ExperienceItem,
  ProfileBanner,
  Project,
  Recommendation,
  ResumeItem,
  Skill,
  TimelineItem,
  WorkPermit,
} from '../types';

export const DATO_SCHEMA = {
  roots: {
    profileBanner: 'profilebanner',
    workPermit: 'workPermit',
    contactMe: 'contactMe',
    musicItems: 'allMusicItems',
    books: 'allReadingItems',
    blog_post: 'allBlogPosts',
    projects: 'allProjects',
    resume: 'allResumes',
    skills: 'allSkills',
    certification: 'allCertifications',
    recommendation: 'allRecommendations',
    timeline: 'allTimelines',
    work_experience: 'allWorkExperiences',
  },
} as const;

export type RawProfileBanner = ProfileBanner;
export type RawWorkPermit = WorkPermit;
export type RawContactMe = ContactMe;
export interface RawMusicItem {
  id: string;
  title: string;
  singer: string;
  image: { url: string };
}
export interface RawBookItem extends Omit<BookItem, 'coverImage'> {
  image: { url: string } | null;
}
export type RawBlogPost = BlogPost;
export type RawProject = Project;
export type RawResumeItem = ResumeItem;
export type RawSkill = Skill;
export interface RawCertification {
  title: string;
  issuer: string;
  issueddate: string;
  link: { url: string } | null;
  iconname: string;
}
export interface RawRecommendation extends Omit<Recommendation, 'body' | 'profileImage'> {
  content: string | null;
  profileImage: { url: string } | null;
}
export type RawTimelineItem = TimelineItem;
export interface RawWorkExperience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string | null;
  isCurrentRole: boolean;
  summaryPoints: string | string[] | null;
  techStack: string | string[] | null;
}

export const toStringArray = (
  value: string | string[] | null | undefined
): string[] => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export const normalizeWorkExperience = (
  item: RawWorkExperience
): ExperienceItem => ({
  id: item.id,
  role: item.role,
  company: item.company,
  duration: `${item.startDate}${item.isCurrentRole ? ' - Present' : item.endDate ? ` - ${item.endDate}` : ''}`,
  description:
    toStringArray(item.summaryPoints)[0] ||
    (toStringArray(item.techStack).length > 0
      ? `Tech stack: ${toStringArray(item.techStack).join(', ')}`
      : item.location || 'Professional experience details coming soon.'),
});
