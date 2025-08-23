export interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  rating: number;
  notes?: string;
}

export interface InterviewData {
  candidateName: string;
  position: string;
  interviewDate: string;
  duration: string;
  interviewer: string;
  overallRating: number;
  status: string;
  recommendation: "hire" | "no-hire" | "maybe";
  strengths: string[];
  concerns: string[];
  notes: string;
  questions: QuestionAnswer[];
}

export interface InterviewReviewProps {
  candidateId: string;
}
