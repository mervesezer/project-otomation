package com.oma.mbu.dtos;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String token;
    private AuthResponseUser user;
}
