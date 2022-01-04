package com.oma.mbu.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class Task extends BaseEntity {
    private String name;

    private String description;

    private boolean isCompleted;

    @ManyToOne()
    @JsonIgnore()
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne()
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
