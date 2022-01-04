package com.oma.mbu.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateManagerDto {
    @Size(min = 2)
    private String name;
    private String lastName;
    @Email
    private String email;
    @Size(min = 6)
    private String password;
}
