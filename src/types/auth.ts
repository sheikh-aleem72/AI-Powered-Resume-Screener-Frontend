export type UserRole = "recruiter";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}
