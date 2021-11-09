package com.oma.mbu.dtos;



import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Data
@AllArgsConstructor
public class ProjectDto {
    @NotNull
    @Size(min = 2)
    private String name;
    @NotNull
    private String description;


}
