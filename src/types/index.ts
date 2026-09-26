export type ProjectStatus = 'Active Prototype' | 'Research & Implementation' | 'Functional Release' | 'In Progress';

export interface ArchitectureStep {
  step: string;
  label: string;
  desc: string;
}

export interface CodeSnippet {
  language: string;
  filename: string;
  code: string;
}

export interface ChallengeItem {
  title: string;
  challenge: string;
  solution: string;
}

export interface CaseStudyData {
  overview: string;
  problem: string;
  approach: string;
  architecture: {
    description: string;
    flowSteps: ArchitectureStep[];
  };
  implementation: string;
  codeSnippet?: CodeSnippet;
  challenges: ChallengeItem[];
  outcome: string;
  futureImprovements: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  featured: boolean;
  status: ProjectStatus;
  technologies: string[];
  problem: string;
  solution: string;
  myContribution: string;
  keyFeatures: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  specSheet: {
    runtime: string;
    throughput: string;
    coreParadigm: string;
    persistence: string;
  };
  caseStudy: CaseStudyData;
}

export interface SkillItem {
  name: string;
  context: string;
  focusArea: string;
  builtWith: string;
  tag: string;
}

export interface StackGroup {
  id: string;
  category: string;
  subtitle: string;
  skills: SkillItem[];
}

export type TimelineType = 'EDUCATION' | 'TECHNICAL_EVENT' | 'JOB_SIMULATION' | 'PROJECT_MILESTONE' | 'CERTIFICATION';

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  entity: string;
  type: TimelineType;
  description: string;
  tags: string[];
  technicalTakeaways: string[];
}

export interface Achievement {
  id: string;
  title: string;
  category: 'Hackathon / Event' | 'Job Simulation' | 'Certification' | 'Milestone';
  organization: string;
  year: string;
  highlight: string;
  status: 'Verified' | 'Completed' | 'Active';
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars?: number;
  forks?: number;
  url: string;
  isFlagship?: boolean;
}
