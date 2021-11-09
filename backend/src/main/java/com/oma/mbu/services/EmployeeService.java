package com.oma.mbu.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.oma.mbu.dtos.EmployeeDto;
import com.oma.mbu.dtos.UpdateEmployeeDto;
import com.oma.mbu.entities.Employee;
import com.oma.mbu.repositories.EmployeeRepository;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;

    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    public Employee findById(UUID id) {
        return employeeRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                String.format("%s id li kullanıcı bulunamadı", id)));
    }

    public void save(EmployeeDto employeeDto) {
        if (employeeRepository.existsByEmail(employeeDto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    String.format("%s email adresi kullanılıyor.", employeeDto.getEmail()));
        }

        var newEmployee = modelMapper.map(employeeDto, Employee.class);
        newEmployee.setDateCreated(new Date());

        employeeRepository.save(newEmployee);
    }

    public void update(UpdateEmployeeDto updateEmployeeDto, UUID id) {
        var employee = findById(id);

        if (updateEmployeeDto.getEmail() != null) {
            if (employeeRepository.existsByEmail(updateEmployeeDto.getEmail()))
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        String.format("%s email adresi kullanılıyor.", updateEmployeeDto.getEmail()));
            employee.setEmail(updateEmployeeDto.getEmail());
        }

        if (updateEmployeeDto.getName() != null)
            employee.setName(updateEmployeeDto.getName());

        if (updateEmployeeDto.getLastName() != null)
            employee.setLastName(updateEmployeeDto.getLastName());

        if (updateEmployeeDto.getPassword() != null)
            employee.setPassword(updateEmployeeDto.getPassword());

        employeeRepository.save(employee);
    }

    public void delete(UUID id) {
        var employee = findById(id);
        employeeRepository.delete(employee);
    }
}
