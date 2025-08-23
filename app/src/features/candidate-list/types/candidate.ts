export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  experience?: string;
  education?: string;
  skills: string[];
  applicationDate: string;
  interviewStatus: "pending" | "scheduled" | "completed" | "cancelled";
  resumeUrl?: string;
  avatar?: string;
  summary: string;
}

export interface JobTitle {
  [key: string]: string;
}
