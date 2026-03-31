// types.ts

export interface ProfileBanner {
  backgroundImage: { url: string };
  headline: string;
  resumeLink: {
    url: string;
  };
  linkedinLink: string;
  profileSummary: string;
}

export interface WorkPermit {
  visaStatus: string;
  expiryDate: string;
  summary: string;
  additionalInfo: string;
}

export interface TimelineItem {
  timelineType: 'work' | 'education';
  name: string;
  title: string;
  techStack: string | string[];
  summaryPoints: string | string[];
  dateRange: string;
}

export interface Project {
  title: string;
  description: string;
  techUsed: string;
  image: { url: string };
}

export interface MusicItem {
  id: string;
  title: string;
  singer: string;
  image: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
}

export interface Certification {
  title: string;
  issuer: string;
  issuedDate: string;
  link: string;
  iconName: string;
}

export interface ContactMe {
  profilePicture: { url: string };
  name: string;
  title: string;
  summary: string;
  companyUniversity: string;
  linkedinLink: string;
  email: string;
  phoneNumber: string;
}

export interface Recommendation {
  name: string;
  role: string;
  company?: string;
  date: string;
  body: string[];
  profileImage?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface BlogPost {
  title: string;
  description: string;
  link: string;
}

export interface ResumeItem {
  title: string;
  file: {
    url: string;
  };
}

export interface Skill { 
  name: string;
  category: string;
  description: string;
  icon: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  location?: string;
  startDate: string;           // ISO date from DatoCMS
  endDate?: string | null;     // null or undefined means "Present"
  isCurrent: boolean;
  summaryPoints: string[];     // or string if you chose multi-line text instead of list
  techStack: string[];         // or string if you chose text
}
