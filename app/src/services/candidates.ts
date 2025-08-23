import { api } from "@/api/axios-config";

// API response types
export interface CandidateUserDTO {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

export interface CandidateDTO {
  id: number;
  jd_id: number;
  applied_at: string;
  user: CandidateUserDTO;
  interview_status: "pending" | "scheduled" | "completed" | "cancelled" | string;
}

export interface CandidatesByJobResponse {
  success: boolean;
  status_code: number;
  data: CandidateDTO[];
}

// Service: fetch candidates by job description id
export const fetchCandidatesByJob = async (jdId: number | string) => {
  const { data } = await api.get<CandidatesByJobResponse>(`/candidates/by-job`, {
    params: { jd_id: jdId },
  });
  return data;
};
