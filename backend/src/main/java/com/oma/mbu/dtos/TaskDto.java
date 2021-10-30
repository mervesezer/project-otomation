package com.oma.mbu.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
public class TaskDto {
    @NotNull
    @Size(min = 2,message = "gorev adi en az 2 karakter olmali")
    private String name;
    @NotNull
    private String description;

}
