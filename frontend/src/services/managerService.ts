import RegisterRequest from "../models/RegisterRequest";
import { axiosService } from "./axiosService";

class ManagerService {
  async save(registerRequest: RegisterRequest): Promise<void> {
    await axiosService.post("/managers", registerRequest);
  }

  async update(id: string, registerRequest: RegisterRequest) {
    await axiosService.put(`/managers/${id}`, registerRequest);
  }
}

export default new ManagerService();
