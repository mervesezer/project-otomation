package com.oma.mbu.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.oma.mbu.dtos.ManagerDto;
import com.oma.mbu.dtos.UpdateManagerDto;
import com.oma.mbu.entities.Manager;
import com.oma.mbu.repositories.ManagerRepository;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ManagerService {
    private final ManagerRepository managerRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    public List<Manager> findAll() {
        return managerRepository.findAll();
    }

    public Manager findById(UUID id) {
        return managerRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                String.format("%s id li kullanıcı bulunamadı", id)));
    }

    public void save(ManagerDto managerDto) {
        if (managerRepository.existsByEmail(managerDto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    String.format("%s email adresi kullanılıyor.", managerDto.getEmail()));
        }

        var newManager = modelMapper.map(managerDto, Manager.class);
        newManager.setDateCreated(new Date());
        newManager.setPassword(passwordEncoder.encode(newManager.getPassword()));

        managerRepository.save(newManager);
    }

    public void update(UpdateManagerDto updateManagerDto, UUID id) {
        var manager = findById(id);

        if (updateManagerDto.getEmail() != null) {
            if (managerRepository.existsByEmail(updateManagerDto.getEmail()))
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        String.format("%s email adresi kullanılıyor.", updateManagerDto.getEmail()));
            manager.setEmail(updateManagerDto.getEmail());
        }

        if (updateManagerDto.getName() != null)
            manager.setName(updateManagerDto.getName());

        if (updateManagerDto.getLastName() != null)
            manager.setLastName(updateManagerDto.getLastName());

        if (updateManagerDto.getPassword() != null)
            manager.setPassword(updateManagerDto.getPassword());

        managerRepository.save(manager);
    }

    public void delete(UUID id) {
        var manager = findById(id);
        managerRepository.delete(manager);
    }
}
