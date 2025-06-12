export interface Project {
  id: number;
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  stars: number;
  forks: number;
  status: 'Active' | 'Completed' | 'In Progress';
  lastUpdated: string;
  screenshots?: string[];
  detailedDescription?: string;
  features?: string[];
} 