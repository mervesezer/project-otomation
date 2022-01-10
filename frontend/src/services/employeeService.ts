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

  async update(id:string, registerRequest:RegisterRequest){
    await axiosService.put(`/employees/${id}`, registerRequest);
  }
}

export default new EmployeeService();
