export interface QuizQuestion {
  id: string;
  questionEs: string;
  korean: string;
  options: string[];
  correctAnswer: number;
  romanization?: string;
  audioText?: string;
}

export interface QuizUnit {
  id: string;
  title: string;
  titleEs: string;
  description: string;
  order: number;
  emoji: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  unitId: string;
  score: number;
  total: number;
  completedAt: Date;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface NumberConversion {
  hangul: string;
  romanization: string;
  audioText: string;
}
