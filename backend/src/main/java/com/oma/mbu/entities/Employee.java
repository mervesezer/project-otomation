package com.oma.mbu.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Employee extends BaseUser{
    @OneToMany(mappedBy = "employee")
    private List<Task> tasks;
    @ManyToMany
    private List<Project> projects;
}
