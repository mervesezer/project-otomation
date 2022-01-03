export default interface AuthUser {
  id: string;
  dateCreated: string;
  name: string;
  lastName: string;
  email: string;
  type: "employee" | "manager";
}
