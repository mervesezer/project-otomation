package com.oma.mbu.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class Manager extends BaseEntity{
    private String name;
    private String lastName;
    private String email;
    private String password;
    @OneToMany(mappedBy = "manager",fetch = FetchType.LAZY)
    private List<Project> projects;
}
