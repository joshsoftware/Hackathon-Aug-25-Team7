import { type ReactNode } from "react";
import { CANDIDATE_LIST_PATH } from "./routes-constants";
import CandidateListPage from "@/features/candidate-list/containers/CandidateListPage";

export interface RouteOptions {
  key: string;
  path: string;
  element: ReactNode;
  isProtected: boolean;
  layout?: AppLayout;
}

export const routes: RouteOptions[] = [
  {
    key: "index",
    path: "/",
    element: <div className="p-8 text-center"><h1 className="text-2xl font-bold">Welcome to the App</h1><p className="mt-4">Navigate to <a href="/candidates/jd-001" className="text-blue-600 hover:underline">/candidates/jd-001</a> to view the candidate list.</p></div>,
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
    key: "test-candidate",
    path: "/candidates/test",
    element: <div className="p-8 text-center"><h1 className="text-2xl font-bold">Test Candidate Route</h1><p className="mt-4">This is a test route to verify routing works.</p></div>,
    isProtected: false,
    includeLayout: true,
  },
];
