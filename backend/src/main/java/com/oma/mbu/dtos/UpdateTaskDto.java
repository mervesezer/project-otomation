package com.oma.mbu.dtos;

import java.util.UUID;

import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateTaskDto {
    @Size(min = 2)
    private String name;
    private String description;
    private UUID employeeId;
}
