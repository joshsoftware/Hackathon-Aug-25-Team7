import { type ReactNode } from "react";

export interface RouteOptions {
  key: string;
  path: string;
  element: ReactNode;
  isProtected: boolean;
  includeLayout: boolean;
}

export const routes: RouteOptions[] = [];
