package com.oma.mbu.repositories;

import com.oma.mbu.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {
}
