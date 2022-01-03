package com.oma.mbu.controllers;

import com.oma.mbu.dtos.AuthResponseDto;
import com.oma.mbu.dtos.LoginDto;
import com.oma.mbu.services.AuthService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public AuthResponseDto login(@RequestBody LoginDto loginDto) {
        return authService.authenticate(loginDto);
    }
}
