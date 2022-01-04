package com.oma.mbu.services;

import java.util.Date;
import java.util.List;

import com.oma.mbu.dtos.ProjectDto;
import com.oma.mbu.entities.Manager;
import com.oma.mbu.entities.Project;
import com.oma.mbu.repositories.ManagerRepository;
import com.oma.mbu.repositories.ProjectRepository;

import org.apache.tomcat.jni.ProcErrorCallback;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ManagerService managerService;
    private final ModelMapper modelMapper;

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public void save(ProjectDto projectDto) {
        Manager manager = managerService.findById(projectDto.getManagerId());

        Project project = modelMapper.map(projectDto, Project.class);
        project.setManager(manager);
        project.setDateCreated(new Date());

        projectRepository.save(project);
    }
}