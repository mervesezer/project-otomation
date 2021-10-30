package com.oma.mbu.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.UUID;
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Employee extends BaseEntity{
    private String name;
    private String lastName;
    private String email;
    private String password;


}
