import { api } from "@/api/axios-config"
import type { Job } from "@/types/jobDescription"

//job description api
export const jobDescription = async(): Promise<Axios.AxiosXHR<Job[]>> => {
    return await api.get('/jd')
}