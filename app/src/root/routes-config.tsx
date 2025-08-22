import { type ReactNode } from "react";
import { SIGNIN_PATH, INTERVIEW_PATH } from "./routes-constants";
import SignInContainer from "@/features/signin/containers/SignInContainer";
import { AppLayout } from "@/shared/lib/enum";
import InterviewContainer from "@/features/interview/containers/InterviewContainer";

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
    key: "interview",
    path: INTERVIEW_PATH,
    element: <InterviewContainer />,
    isProtected: false,
  },
];
