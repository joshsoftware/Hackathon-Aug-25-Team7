import type { InterviewStatusEnum } from "@/shared/lib/enums";

export interface Interview {
  _id: string;
  candidateName: string;
  candidateEmail: string;
  job: string;
  status: InterviewStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
