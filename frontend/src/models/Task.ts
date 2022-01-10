import AuthUser from "./AuthUser";

export default interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  employee: AuthUser;
}
