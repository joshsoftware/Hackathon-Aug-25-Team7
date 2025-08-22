import type { UserRole } from "../shared/lib/enum";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  token_type: "bearer";
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
