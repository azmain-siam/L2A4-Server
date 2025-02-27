export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  status: "active" | "inactive";
  address?: string;
}
