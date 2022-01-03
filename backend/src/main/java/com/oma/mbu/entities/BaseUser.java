package com.oma.mbu.entities;

import javax.persistence.MappedSuperclass;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
public class BaseUser extends BaseEntity {
    private String name;
    private String lastName;
    private String email;
    @JsonIgnore
    private String password;
}
