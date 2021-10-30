package com.oma.mbu.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
@Data
@AllArgsConstructor
public class ManagerDto {
    @NotNull
    @Size(min = 2, message = "yonetici adi en az 2 karakter olmali")
    private String name;
    @NotNull
    private String lastName;
    @Email
    @NotNull
    private String email;
    @NotNull
    private String password;
}
