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
public class Task {
    @Id
    @GeneratedValue(generator = "uuid")
    private UUID taskId;
    private String name;
    private String description;
    private Date dateCreated;
    private boolean isCompleted;
}
