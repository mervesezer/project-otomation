import AuthResponse from "../models/AuthResponse";
import LoginRequest from "../models/LoginRequest";
import { axiosService } from "./axiosService";

class AuthService {
  async login(loginRequest: LoginRequest): Promise<AuthResponse> {
    const data = (await axiosService.post("/auth/login", loginRequest)).data;

    axiosService.defaults.headers["Authorization"] = `Bearer ${data.token}`;
    return data;
  }
}

export default new AuthService();
