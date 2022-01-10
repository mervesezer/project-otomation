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

  async findTaskByProjectAndTaskId(
    projectId: string,
    taskId: string
  ): Promise<Task> {
    return (await axiosService.get(`/projects/${projectId}/tasks/${taskId}`))
      .data;
  }

  async completeTask(projectId: string, taskId: string) {
    await axiosService.post(`/projects/${projectId}/tasks/${taskId}/complete`);
  }

  async incompleteTask(projectId: string, taskId: string) {
    await axiosService.post(
      `/projects/${projectId}/tasks/${taskId}/incomplete`
    );
  }

  async updateTask(
    projectId: string,
    taskId: string,
    createTaskRequest: CreateTaskRequest
  ) {
    if (createTaskRequest.name === "") {
      delete createTaskRequest.name;
    }
    if (createTaskRequest.description === "") {
      delete createTaskRequest.description;
    }
    if (createTaskRequest.employeeId === "") {
      delete createTaskRequest.employeeId;
    }

    await axiosService.put(
      `/projects/${projectId}/tasks/${taskId}`,
      createTaskRequest
    );
  }
}

export default new ProjectService();
