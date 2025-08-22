import { api } from "@/api/axios-config";
import type { SignInRequest, SignInResponse } from "@/types/auth";

export const loginService = async (input: SignInRequest): Promise<Axios.AxiosXHR<SignInResponse>> => {
  return await api.post("/auth/login", input);
};
