package com.oma.mbu.dtos;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class AuthResponseUser {
    private UUID id;
    private Date dateCreated;
    private String name;
    private String lastName;
    private String email;
    private String type;
}
