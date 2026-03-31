import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';
import { getSkills } from '../queries/getSkills';
import { FaAws, FaChevronLeft, FaChevronRight, FaDocker, FaGitAlt, FaNodeJs, FaReact } from 'react-icons/fa';
import {
  SiCss3,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiTypescript,
} from 'react-icons/si';
import { Skill } from '../types';

const CATEGORY_ORDER = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps / Cloud',
  'Programming Languages',
  'Tools',
  'Other',
] as const;

const SKILL_CATEGORY_MAP: Record<string, string> = {
  react: 'Frontend',
  html: 'Frontend',
  css: 'Frontend',
  'node.js': 'Backend',
  nodejs: 'Backend',
  'express.js': 'Backend',
  express: 'Backend',
  mongodb: 'Database',
  sql: 'Database',
  javascript: 'Programming Languages',
  typescript: 'Programming Languages',
  aws: 'DevOps / Cloud',
  docker: 'DevOps / Cloud',
  kubernetes: 'DevOps / Cloud',
  'ci/cd pipeline': 'DevOps / Cloud',
  websocket: 'Backend',
  'git & version control': 'Tools',
};

const iconMap: Record<string, JSX.Element> = {
  react: <FaReact />,
  fareact: <FaReact />,
  nodejs: <FaNodeJs />,
  'node.js': <FaNodeJs />,
  fanodejs: <FaNodeJs />,
  mongodb: <SiMongodb />,
  javascript: <SiJavascript />,
  typescript: <SiTypescript />,
  sitypescript: <SiTypescript />,
  sql: <SiMysql />,
  mysql: <SiMysql />,
  'express.js': <SiExpress />,
  express: <SiExpress />,
  docker: <FaDocker />,
  fadocker: <FaDocker />,
  kubernetes: <SiKubernetes />,
  sikubernetes: <SiKubernetes />,
  'ci/cd pipeline': <FaAws />,
  websocket: <SiExpress />,
  html: <SiHtml5 />,
  css: <SiCss3 />,
  aws: <FaAws />,
  faaws: <FaAws />,
  git: <FaGitAlt />,
  'git & version control': <FaGitAlt />,
};

type GroupedSkills = Record<string, Skill[]>;
type RowScrollState = Record<string, { canScrollLeft: boolean; canScrollRight: boolean }>;

const normalizeKey = (value: string): string => value.trim().toLowerCase();

const resolveCategory = (skill: Skill): string => {
  const directCategory = skill.category?.trim();

  if (directCategory && directCategory.toLowerCase() !== 'other') {
    return directCategory;
  }

  return SKILL_CATEGORY_MAP[normalizeKey(skill.name)] ?? 'Other';
};

const normalizeSkill = (skill: Skill): Skill => ({
  ...skill,
  name: skill.name?.trim() || 'Skill',
  category: resolveCategory(skill),
  description: skill.description?.trim() || 'Details coming soon.',
  icon: skill.icon?.trim() || normalizeKey(skill.name),
});

const groupSkills = (skills: Skill[]): GroupedSkills =>
  skills.reduce<GroupedSkills>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }

    acc[skill.category].push(skill);
    return acc;
  }, {});

const sortCategories = (groupedSkills: GroupedSkills): Array<[string, Skill[]]> =>
  Object.entries(groupedSkills).sort(([left], [right]) => {
    const leftIndex = CATEGORY_ORDER.indexOf(left as (typeof CATEGORY_ORDER)[number]);
    const rightIndex = CATEGORY_ORDER.indexOf(right as (typeof CATEGORY_ORDER)[number]);

    const normalizedLeft = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex;
    const normalizedRight = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex;

    if (normalizedLeft !== normalizedRight) {
      return normalizedLeft - normalizedRight;
    }

    return left.localeCompare(right);
  });

const Skills: React.FC = () => {
  const [skillsData, setSkillsData] = useState<Skill[] | null>(null);
  const [rowScrollState, setRowScrollState] = useState<RowScrollState>({});
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const syncRowState = (category: string) => {
    const row = rowRefs.current[category];

    if (!row) {
      return;
    }

    const maxScrollLeft = row.scrollWidth - row.clientWidth;

    setRowScrollState((currentState) => ({
      ...currentState,
      [category]: {
        canScrollLeft: row.scrollLeft > 8,
        canScrollRight: row.scrollLeft < maxScrollLeft - 8,
      },
    }));
  };

  const scrollRow = (category: string, direction: 'left' | 'right') => {
    const row = rowRefs.current[category];

    if (!row) {
      return;
    }

    const scrollAmount = Math.max(row.clientWidth * 0.85, 260);

    row.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    async function fetchSkills() {
      const data = await getSkills();
      setSkillsData(data.map(normalizeSkill));
    }

    fetchSkills();
  }, []);

  useEffect(() => {
    if (!skillsData) {
      return;
    }

    const groupedSkills = groupSkills(skillsData);
    const categories = Object.keys(groupedSkills);

    const handleResize = () => {
      categories.forEach(syncRowState);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [skillsData]);

  if (!skillsData) {
    return (
      <div className="skills-container">
        <h2 className="skills-title">Skills</h2>
        <p className="skills-status">Loading skills...</p>
      </div>
    );
  }

  const groupedSkills = groupSkills(skillsData);
  const categorizedSkills = sortCategories(groupedSkills);

  return (
    <div className="skills-container">
      <h2 className="skills-title">Skills</h2>
      <div className="skills-sections">
        {categorizedSkills.map(([category, skills]) => {
          const scrollState = rowScrollState[category] ?? {
            canScrollLeft: false,
            canScrollRight: true,
          };

          return (
            <section key={category} className="skill-category">
              <div className="category-header">
                <h3 className="category-title">{category}</h3>
                <span className="category-count">{skills.length} skills</span>
              </div>

              <div className="skills-row-shell">
                <button
                  type="button"
                  className={`row-nav row-nav-left${scrollState.canScrollLeft ? ' is-visible' : ''}`}
                  onClick={() => scrollRow(category, 'left')}
                  aria-label={`Scroll ${category} skills left`}
                >
                  <FaChevronLeft />
                </button>

                <div className="row-fade row-fade-left" aria-hidden="true" />
                <div className="row-fade row-fade-right" aria-hidden="true" />

                <div
                  ref={(node) => {
                    rowRefs.current[category] = node;
                  }}
                  className="skills-row"
                  role="list"
                  aria-label={`${category} skills`}
                  onScroll={() => syncRowState(category)}
                >
                  {skills.map((skill) => (
                    <article key={`${category}-${skill.name}`} className="skill-card" role="listitem">
                      <div className="icon">{iconMap[normalizeKey(skill.icon)] || iconMap[normalizeKey(skill.name)] || <FaReact />}</div>
                      <h4 className="skill-name">
                        {skill.name.split('').map((letter, index) => (
                          <span key={`${skill.name}-${index}`} className="letter" style={{ animationDelay: `${index * 0.03}s` }}>
                            {letter}
                          </span>
                        ))}
                      </h4>
                      <p className="skill-description">{skill.description}</p>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  className={`row-nav row-nav-right${scrollState.canScrollRight ? ' is-visible' : ''}`}
                  onClick={() => scrollRow(category, 'right')}
                  aria-label={`Scroll ${category} skills right`}
                >
                  <FaChevronRight />
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
