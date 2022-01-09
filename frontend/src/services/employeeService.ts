import AuthUser from "../models/AuthUser";
import { axiosService } from "./axiosService";

class EmployeeService {
  async findAll(): Promise<AuthUser[]> {
    return (await axiosService.get("/employees")).data;
  }
}

export default new EmployeeService();
