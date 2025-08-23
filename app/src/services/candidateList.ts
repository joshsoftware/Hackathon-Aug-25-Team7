import { api } from "@/api/axios-config";
import type { Candidate } from "@/features/candidate-list/types/candidate";

// Fetch candidate list for a given job ID
export const getCandidates = async (jd_id: number): Promise<Candidate[]> => {
  const response = await api.get("/candidates/by-job", {
    params: { jd_id },
  });
  return response.data as Candidate[];
};