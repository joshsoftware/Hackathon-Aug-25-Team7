import { type ReactNode } from "react";
import { CANDIDATE_LIST_PATH, INTERVIEW_REVIEW_PATH, JOB_DESCRIPTION_PATH, SIGNIN_PATH } from "./routes-constants";
import CandidateListPage from "@/features/candidate-list/containers/CandidateListPage";
import InterviewReviewPage from "@/features/interview-summary/containers/InterviewReviewPage";
import AdminDashboard from "@/features/company-dashboard/containers/AdminDashboard";
import { JobDescriptionContainer } from "@/features/JobDescription/container/JobDescriptionContainer";
import SignInContainer from "@/features/signin/containers/SignInContainer";
import { AppLayout } from "@/shared/lib/enum";

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
    key: "admin-dashboard",
    path: "/",
    element: <AdminDashboard />,
    isProtected: false,
    includeLayout: true,
  },
  {
    key: "candidate-list",
    path: CANDIDATE_LIST_PATH,
    element: <CandidateListPage />,
    isProtected: false, // Temporarily disable auth to test routing
    includeLayout: true,
  },
  {
    key: "interview-review",
    path: INTERVIEW_REVIEW_PATH,
    element: <InterviewReviewPage />,
    isProtected: false, // Temporarily disable auth to test routing
    includeLayout: true,
  },
  {
    key: "job-description",
    path: JOB_DESCRIPTION_PATH,
    element: <JobDescriptionContainer />, 
    isProtected: false,
    includeLayout: true,
  },
  {
    key: "test-candidate",
    path: "/candidates/test",
    element: <div className="p-8 text-center"><h1 className="text-2xl font-bold">Test Candidate Route</h1><p className="mt-4">This is a test route to verify routing works.</p></div>,
    isProtected: false,
    includeLayout: true,
  },
];
