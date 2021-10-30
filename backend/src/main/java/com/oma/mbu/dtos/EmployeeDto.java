package com.oma.mbu.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
public class EmployeeDto {
    @NotNull
    @Size(min = 2, message = "calisan adi en az 2 karakter olmali")
    private String name;
    @NotNull
    private String lastName;
    @Email
    @NotNull
    private String email;
    @NotNull
    private String password;

}
