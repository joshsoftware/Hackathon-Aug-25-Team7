import { api } from "@/api/axios-config";
import type { Interview } from "@/types/interview";

//awaiting to be implemented
//pre interview screen
export const initiateInterview = async (
  interviewId: string,
  candidateName: string,
): Promise<Axios.AxiosXHR<Interview>> => {
  return await api.post(`/interview/initiate/${interviewId}`, {
    candidateName,
  });
};

