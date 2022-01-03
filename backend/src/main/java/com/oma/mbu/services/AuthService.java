package com.oma.mbu.services;

import com.oma.mbu.config.ApplicationUserDetailsService;
import com.oma.mbu.dtos.AuthResponseDto;
import com.oma.mbu.dtos.AuthResponseUser;
import com.oma.mbu.dtos.LoginDto;
import com.oma.mbu.entities.BaseUser;
import com.oma.mbu.repositories.EmployeeRepository;
import com.oma.mbu.repositories.ManagerRepository;
import com.oma.mbu.utils.JwtUtil;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final EmployeeRepository employeeRepository;
    private final ManagerRepository managerRepository;
    private final AuthenticationManager authenticationManager;
    private final ApplicationUserDetailsService applicationUserDetailsService;
    private final JwtUtil jwtUtil;
    private final ModelMapper modelMapper;

    public AuthResponseDto authenticate(LoginDto loginDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()));
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Eposta veya şifre yanlış.");
        }

        UserDetails userDetails = applicationUserDetailsService.loadUserByUsername(loginDto.getEmail());
        String token = jwtUtil.generateToken(userDetails.getUsername());

        var authResponse = new AuthResponseDto();
        authResponse.setToken(token);

        BaseUser user = null;

        if (managerRepository.existsByEmail(loginDto.getEmail())) {
            user = managerRepository.findByEmail(loginDto.getEmail());
            var authUser = modelMapper.map(user, AuthResponseUser.class);
            authUser.setType("manager");
            authResponse.setUser(authUser);
        } else if (employeeRepository.existsByEmail(loginDto.getEmail())) {
            user = employeeRepository.findByEmail(loginDto.getEmail());
            var authUser = modelMapper.map(user, AuthResponseUser.class);
            authUser.setType("employee");
            authResponse.setUser(authUser);
        }

        authResponse.setToken(token);

        return authResponse;
    }
}
