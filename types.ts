export interface AnalysisState {
  isLoading: boolean;
  result: string | null;
  error: string | null;
}

export interface UserInput {
  text: string;
  image: File | null;
  imagePreview: string | null;
}

// 0 = Casual/Concise, 100 = Formal/Detailed
export interface AnalysisOptions {
  style: number; 
  length: number;
}

export enum ValuePillar {
  TRUST = 'TRUST',
  GROWTH = 'GROWTH'
}