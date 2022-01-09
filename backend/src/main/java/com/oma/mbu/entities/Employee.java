package com.oma.mbu.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonIgnoreProperties(value = { "projects", "tasks" })
public class Employee extends BaseUser {
    @OneToMany(mappedBy = "employee")
    private List<Task> tasks;
    @ManyToMany
    private List<Project> projects;
}
