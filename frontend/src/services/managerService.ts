import RegisterRequest from "../models/RegisterRequest";
import { axiosService } from "./axiosService";

class ManagerService {
  async save(registerRequest: RegisterRequest): Promise<void> {
    await axiosService.post("/managers", registerRequest);
  }
}

export default new ManagerService();
