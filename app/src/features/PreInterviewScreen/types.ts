import type { InterviewStatusEnum } from "@/shared/lib/enums";

export type Interview = {
  _id: string;
  candidateName: string;
  candidateEmail: string;
  job: string ;
  status: InterviewStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

