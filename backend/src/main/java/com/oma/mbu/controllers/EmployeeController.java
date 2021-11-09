package com.oma.mbu.controllers;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;
import com.oma.mbu.dtos.EmployeeDto;
import com.oma.mbu.dtos.UpdateEmployeeDto;
import com.oma.mbu.entities.Employee;
import com.oma.mbu.services.EmployeeService;

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
@RequestMapping("employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping
    public List<Employee> findAll() {
        return employeeService.findAll();
    }

    @GetMapping("/{id}")
    public Employee findById(@PathVariable UUID id) {
        return employeeService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        employeeService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable UUID id, @RequestBody @Valid UpdateEmployeeDto updateEmployeeDto) {
        employeeService.update(updateEmployeeDto, id);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void save(@RequestBody @Valid EmployeeDto employeeDto) {
        employeeService.save(employeeDto);
    }
}
