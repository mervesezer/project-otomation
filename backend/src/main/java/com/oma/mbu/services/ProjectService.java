package com.oma.mbu.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.oma.mbu.dtos.ProjectDto;
import com.oma.mbu.dtos.TaskDto;
import com.oma.mbu.dtos.UpdateTaskDto;
import com.oma.mbu.entities.Employee;
import com.oma.mbu.entities.Manager;
import com.oma.mbu.entities.Project;
import com.oma.mbu.entities.Task;
import com.oma.mbu.repositories.ProjectRepository;
import com.oma.mbu.repositories.TaskRepository;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final ManagerService managerService;
    private final EmployeeService employeeService;
    private final ModelMapper modelMapper;

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public Project findById(UUID id) {
        return projectRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                String.format("%s id li proje bulunamadı", id)));
    }

    public void save(ProjectDto projectDto) {
        Manager manager = managerService.findById(projectDto.getManagerId());

        Project project = modelMapper.map(projectDto, Project.class);
        project.setManager(manager);
        project.setDateCreated(new Date());

        projectRepository.save(project);
    }

    public List<Task> findAllTasksByProjectId(UUID id) {
        Project project = findById(id);
        return taskRepository.findByProject(project);
    }

    public Task findTaskById(UUID projectId, UUID taskId) {
        Project project = findById(projectId);
        return taskRepository.findByProjectAndId(project, taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("%s id li görev bulunamadı", taskId)));
    }

    public void deleteTaskByProjectId(UUID projectId, UUID taskId) {
        Task task = findTaskById(projectId, taskId);
        taskRepository.delete(task);
    }

    public void updateTaskByProjectId(UUID projectId, UUID taskId, UpdateTaskDto updateTaskDto) {
        Task task = findTaskById(projectId, taskId);

        if (updateTaskDto.getName() != null) {
            task.setName(updateTaskDto.getName());
        }
        if (updateTaskDto.getDescription() != null) {
            task.setDescription(updateTaskDto.getDescription());
        }
        if (updateTaskDto.getEmployeeId() != null) {
            Employee employee = employeeService.findById(updateTaskDto.getEmployeeId());
            task.setEmployee(employee);
        }

        taskRepository.save(task);
    }

    public void saveTaskByProjectId(UUID projectId, TaskDto taskDto) {
        Project project = findById(projectId);
        Employee employee = employeeService.findById(taskDto.getEmployeeId());

        Task task = modelMapper.map(taskDto, Task.class);
        task.setDateCreated(new Date());
        task.setEmployee(employee);
        task.setProject(project);

        taskRepository.save(task);
    }
}