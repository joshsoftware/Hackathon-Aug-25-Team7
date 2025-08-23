export const initiateInterview = async (
  interviewId: string,
  candidateName: string,
): Promise<AxiosResponse<CustomApiResponse<undefined>>> => {
  return await api.post(`/interview/initiate/${interviewId}`, {
    candidateName,
  });
};