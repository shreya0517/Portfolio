// fallbackData.ts

import {
  ProfileBanner,
  Project,
  Skill,
  Certification,
  TimelineItem,
  WorkExperience,
  ContactMe,
  WorkPermit,
} from "../types";

// ⭐ 1. PROFILE BANNER
export const FALLBACK_PROFILE_BANNER: ProfileBanner = {
  backgroundImage: { url: "/images/my-bg.jpg" },
  headline: "Hi, I'm Shreya Garg",
  resumeLink: { url: "/Resume.docx" },
  linkedinLink: "https://linkedin.com/in/your-link",
  profileSummary:
    "Frontend Developer passionate about crafting clean and intuitive user interfaces.",
};

// ⭐ 2. PROJECTS
export const FALLBACK_PROJECTS: Project[] = [
  {
    title: "Netflix Clone (React)",
    description:
      "A Netflix UI clone built with React, TMDB API, and Tailwind CSS.",
    techUsed: "React, Tailwind, TMDB API",
    image: { url: "/images/projects/netflix-clone.jpg" },
  },
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio showcasing skills, projects, and experience.",
    techUsed: "React, TypeScript, Tailwind",
    image: { url: "/images/projects/portfolio.jpg" },
  },
];

// ⭐ 3. SKILLS
export const FALLBACK_SKILLS: Skill[] = [
  {
    name: "React",
    category: "Frontend",
    description: "Building fast and dynamic user interfaces.",
    icon: "react",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description: "Type-safe JavaScript for scalable apps.",
    icon: "typescript",
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "Building REST APIs and backend logic.",
    icon: "nodejs",
  },
];

// ⭐ 4. CERTIFICATIONS
export const FALLBACK_CERTIFICATIONS: Certification[] = [
  {
    title: "Frontend Developer Certificate",
    issuer: "FreeCodeCamp",
    issuedDate: "2023",
    link: "https://example.com/certificate",
    iconName: "certificate",
  },
];

// ⭐ 5. TIMELINE (Work + Education)
export const FALLBACK_TIMELINE: TimelineItem[] = [
  {
    timelineType: "education",
    name: "St. Mary's School",
    title: "10th",
    techStack: ["Discipline", "Curiosity", "Foundation"],
    summaryPoints: [
      "Built the core habits of learning, consistency, and communication.",
    ],
    dateRange: "2008 - 2018",
  },
  {
    timelineType: "education",
    name: "Narayana Junior College",
    title: "12th",
    techStack: ["Mathematics", "Problem Solving", "Focus"],
    summaryPoints: [
      "Strengthened analytical thinking and built momentum toward a technical path.",
    ],
    dateRange: "2018 - 2020",
  },
  {
    timelineType: "education",
    name: "XYZ University",
    title: "College",
    techStack: ["Computer Science", "Projects", "Teamwork"],
    summaryPoints: [
      "Explored software fundamentals, collaborative projects, and practical problem solving.",
    ],
    dateRange: "2020 - 2024",
  },
  {
    timelineType: "work",
    name: "Infosys / Internship Experience",
    title: "Internship",
    techStack: ["React", "TypeScript", "Node.js"],
    summaryPoints: [
      "Gained hands-on experience building real products.",
    ],
    dateRange: "2024 - Present",
  },
];

// ⭐ 6. WORK EXPERIENCE (Professional Page)
export const FALLBACK_WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: "Google",
    role: "Frontend Intern",
    location: "Hyderabad",
    startDate: "2023",
    endDate: "2024",
    isCurrent: false,
    techStack: ["React", "TypeScript", "Figma"],
    summaryPoints: [
      "Built reusable UI components for internal dashboards",
      "Improved page performance by 30%",
    ],
  },
  {
    company: "Infosys",
    role: "Software Engineer",
    location: "Pune",
    startDate: "2024",
    endDate: null,
    isCurrent: true,
    techStack: ["Node.js", "Express", "MongoDB"],
    summaryPoints: [
      "Developing scalable backend services",
      "Collaborating with cross-functional teams",
    ],
  },
];

// ⭐ 7. CONTACT ME
export const FALLBACK_CONTACT: ContactMe = {
  profilePicture: { url: "/images/profile/me.jpg" },
  name: "Shreya Garg",
  title: "Frontend Developer",
  summary: "I build beautiful and efficient user interfaces.",
  companyUniversity: "XYZ University",
  linkedinLink: "https://linkedin.com/in/your-link",
  email: "shreya@example.com",
  phoneNumber: "+91-9876543210",
};

// ⭐ 8. WORK PERMIT
export const FALLBACK_WORK_PERMIT: WorkPermit = {
  visaStatus: "Indian Citizen",
  expiryDate: "N/A",
  summary: "Eligible to work full-time without restrictions.",
  additionalInfo: "No visa sponsorship required.",
};
