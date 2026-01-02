
export interface KnowledgeEntry {
  id: string;
  title: string;
  content: string; 
  isActive: boolean;
  type: 'product' | 'policy' | 'ecosystem' | 'file' | 'other';
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  uploadDate: string;
}

// Added EVALUATION tab to support the company evaluation feature
export enum AppTab {
  DASHBOARD = 'dashboard',
  BENCHMARK = 'benchmark',
  STRATEGY = 'strategy',
  OBJECTION = 'objection',
  THEORY = 'theory',
  CONTEXT = 'context',
  MEME = 'meme',
  COMEDY = 'comedy',
  EVALUATION = 'evaluation'
}
