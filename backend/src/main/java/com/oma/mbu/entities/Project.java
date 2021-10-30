package com.oma.mbu.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class Project extends BaseEntity {
    private String name;
    private String description;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Manager manager;
    @OneToMany(mappedBy = "project")
    private List<Task> tasks;
    @ManyToMany
    private List<Employee> employees;
}
