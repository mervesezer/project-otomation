import AuthUser from "./AuthUser";

export default interface AuthResponse {
  token: string;
  user: AuthUser;
}
