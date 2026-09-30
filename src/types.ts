export type ActiveTab = 'index' | 'work' | 'process' | 'about' | 'contact';

export interface BoardImage {
  id: string;
  url: string;
  title: string;
  aspect?: 'landscape' | 'tall' | 'square';
}

export interface ProjectBoards {
  themeBoard: BoardImage[];
  inspirationBoard: BoardImage[];
  developmentBoard: BoardImage[];
  lookBook: BoardImage[];
}

export type DarkSafariBoards = ProjectBoards;
export type NocturnalBoards = ProjectBoards;

export type BoardKey = keyof ProjectBoards;

export interface Project {
  id: string;
  number: string;
  title: string;
  year: string;
  category: string;
  tagline: string;
  description: string;
  concept: string;
  research: string;
  processDetails: string;
  outcome: string;
  coverImage: string;
  moodBoardImage?: string;
  galleryImages: string[];
  tags: string[];
  boards?: DarkSafariBoards;
}

export interface ProcessItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  projectRef: string;
  year: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface ContactInfo {
  email: string;
  instagram: string;
  linkedin: string;
  behance?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  bioSecondary: string;
  portraitUrl: string;
  email: string;
  instagram: string;
  linkedin: string;
  behance?: string;
  contact: ContactInfo;
  education: EducationItem[];
  skills: string[];
  interests: string[];
  projects: Project[];
  processItems: ProcessItem[];
}
