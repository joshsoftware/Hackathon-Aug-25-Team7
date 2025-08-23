import { type ReactNode } from "react";
import { JOB_DESCRIPTION_PATH, SIGNIN_PATH } from "./routes-constants";
import SignInContainer from "@/features/signin/containers/SignInContainer";
import { AppLayout } from "@/shared/lib/enum";
import { JobDescriptionContainer } from "@/features/jobDescription/container/JobDescriptionContainer";

export interface RouteOptions {
  key: string;
  path: string;
  element: ReactNode;
  isProtected: boolean;
  layout?: AppLayout;
}

export const routes: RouteOptions[] = [
  {
    key: "sign-in",
    path: SIGNIN_PATH,
    element: <SignInContainer />,
    isProtected: false,
    layout: AppLayout.AUTH,
  },
  {
    key: "job-description",
    path: JOB_DESCRIPTION_PATH,
    element: <JobDescriptionContainer />,
    isProtected: false,
  },
];
