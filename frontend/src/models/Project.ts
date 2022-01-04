import AuthUser from "./AuthUser";

export default interface Project {
  id: string;
  dateCreated: string;
  name: string;
  description: string;
  manager: AuthUser;
}
