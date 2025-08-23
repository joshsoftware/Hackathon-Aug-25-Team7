import type { Interview } from "@/features/PreInterviewScreen/types";
import type { InterviewStatus, UserRole } from "@/shared/lib/enum";

interface Candidate {
  id: number;
  jd_id: number;
  applied_at: string;
  user: {
    id: number;
    email: string;
    full_name: string;
    role: UserRole; 
  };
  interview_status: InterviewStatus;
}