import { api } from "@/api/axios-config";
import type { Job } from "@/types/jobDescription";

export interface ApiResponse<T> {
    success: boolean;
    status_code: number;
    data: T;
}

// job description api
export const jobDescription = async () => {
    return await api.get<ApiResponse<Job[]>>("/jd");
};
