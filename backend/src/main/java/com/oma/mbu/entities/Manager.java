package com.oma.mbu.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
@JsonIgnoreProperties(value = { "projects", "handler", "hibernateLazyInitializer" }, allowSetters = true)
public class Manager extends BaseUser {
    @OneToMany(mappedBy = "manager", fetch = FetchType.EAGER)
    private List<Project> projects;
}
