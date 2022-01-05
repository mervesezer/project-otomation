import CreateProjectRequest from "../models/CreateProjectRequest";
import Project from "../models/Project";
import { axiosService } from "./axiosService";

class ProjectService {
  async findAll(): Promise<Project[]> {
    return (await axiosService.get("/projects")).data;
  }

  async findById(id: string): Promise<Project> {
    return (await axiosService.get(`/projects/${id}`)).data;
  }

  async save(createProjectRequest: CreateProjectRequest): Promise<void> {
    await axiosService.post("/projects", createProjectRequest);
  }
}

export default new ProjectService();
