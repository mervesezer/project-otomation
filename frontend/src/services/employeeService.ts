import AuthUser from "../models/AuthUser";
import RegisterRequest from "../models/RegisterRequest";
import { axiosService } from "./axiosService";

class EmployeeService {
  async findAll(): Promise<AuthUser[]> {
    return (await axiosService.get("/employees")).data;
  }

  async save(registerRequest: RegisterRequest): Promise<void> {
    await axiosService.post("/employees", registerRequest);
  }
}

export default new EmployeeService();
