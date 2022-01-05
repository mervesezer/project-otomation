package com.oma.mbu.controllers;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import com.oma.mbu.dtos.ProjectDto;
import com.oma.mbu.entities.Project;
import com.oma.mbu.entities.Task;
import com.oma.mbu.services.ProjectService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("projects")
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public List<Project> findAll() {
        return projectService.findAll();
    }

    @PostMapping
    public void save(@RequestBody @Valid ProjectDto projectDto) {
        projectService.save(projectDto);
    }

    @GetMapping("{id}")
    public Project findById(@PathVariable UUID id) {
        return projectService.findById(id);
    }

    // @GetMapping("/{id}/tasks")
    // public List<Task> findAllTasksByProjectId(@PathVariable UUID id) {
    //     return projectService.findAllTasksByProjectId(id);
    // }
}
