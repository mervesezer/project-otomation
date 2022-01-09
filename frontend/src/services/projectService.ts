import CreateProjectRequest from "../models/CreateProjectRequest";
import CreateTaskRequest from "../models/CreateTaskRequest";
import Project from "../models/Project";
import Task from "../models/Task";
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

  async findAllTasks(id: string): Promise<Task[]> {
    return await (
      await axiosService.get(`/projects/${id}/tasks`)
    ).data;
  }

  async saveTaskByProjectId(
    id: string,
    createTaskRequest: CreateTaskRequest
  ): Promise<void> {
    await axiosService.post(`/projects/${id}/tasks`, createTaskRequest);
  }

  async deleteTaskByProjectId(id: string, taskId: string): Promise<void> {
    await axiosService.delete(`/projects/${id}/tasks/${taskId}`);
  }
}

export default new ProjectService();
