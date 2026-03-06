export interface TResume {
  contactLinks: TContactLink[];
  skills: TSkills;
  experience: TExperience;
  projects: TProject[];
}

export interface TContactLink {
  icon: string;
  label: string;
  href: string;
}

export interface TSkills {
  languages: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
}

export interface TExperience {
  title: string;
  company: string;
  duration: string;
  description: string;
  stack: string[];
}

export interface TProject {
  name: string;
  live?: string; // URL to access the project
  code: string; // GitHub repository or source code link
  stack: string[];
  desc: string; // Description of the project
}
