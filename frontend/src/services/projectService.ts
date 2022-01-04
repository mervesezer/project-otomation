import Project from "../models/Project";
import { axiosService } from "./axiosService";

class ProjectService {
  async findAll(): Promise<Project[]> {
    return (await axiosService.get("/projects")).data;
  }
}

export default new ProjectService();
