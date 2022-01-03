package com.oma.mbu.config;

import com.oma.mbu.entities.BaseUser;
import com.oma.mbu.repositories.EmployeeRepository;
import com.oma.mbu.repositories.ManagerRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationUserDetailsService implements UserDetailsService {
    private final ManagerRepository managerRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        BaseUser user;

        if (managerRepository.existsByEmail(email)) {
            user = managerRepository.findByEmail(email);
        } else if (employeeRepository.existsByEmail(email)) {
            user = employeeRepository.findByEmail(email);
        } else {
            throw new UsernameNotFoundException(email);
        }

        return new ApplicationUserDetails(user);
    }

}
