package com.oma.mbu.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
public class Manager {
    @Id
    @GeneratedValue(generator = "uuid")
    private UUID managerId;
    private String name;
    private String lastName;
    private String email;
    private String password;
    private Date dateCreated;
}
