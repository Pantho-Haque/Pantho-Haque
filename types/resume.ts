export interface TResume {
  hero: THero;
  skills: TSkills;
  experience: TExperience[];
  projects: TProject[];
  education: TEducation;
}

export interface TEducation {
  institution: string;
  degree: string;
  cgpa: string;
  graduation: string;
}

export interface THero {
  isAvailable: boolean;
  name: string;
  current_position: string;
  company_name:string;
  comment_one: string;
  comment_two: string;
  contactLinks: TContactLink[];
  photo: string;
  cover_photo:string;
  achievements: TAchievement[];
}

export interface TAchievement {
  icon: string;
  text: string;
  theme:string;
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
  stack: string;
  desc: string; // Description of the project
  priority: number;
}
