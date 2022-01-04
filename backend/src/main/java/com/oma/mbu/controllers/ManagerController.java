package com.oma.mbu.controllers;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import com.oma.mbu.dtos.ManagerDto;
import com.oma.mbu.dtos.UpdateManagerDto;
import com.oma.mbu.entities.Manager;
import com.oma.mbu.services.ManagerService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("managers")
public class ManagerController {
    private final ManagerService managerService;

    @GetMapping
    public List<Manager> findAll() {
        return managerService.findAll();
    }

    @GetMapping("/{id}")
    public Manager findById(@PathVariable UUID id) {
        return managerService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        managerService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable UUID id, @RequestBody @Valid UpdateManagerDto updateManagerDto) {
        managerService.update(updateManagerDto, id);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void save(@RequestBody @Valid ManagerDto managerDto) {
        managerService.save(managerDto);
    }
}
