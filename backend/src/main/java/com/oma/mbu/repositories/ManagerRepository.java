package com.oma.mbu.repositories;

import com.oma.mbu.entities.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, UUID> {
    boolean existsByEmail(String email);

    Manager findByEmail(String email);
}
