package com.oma.mbu.repositories;

import com.oma.mbu.entities.Project;
import com.oma.mbu.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByProject(Project project);

    Optional<Task> findByProjectAndId(Project project, UUID id);
}
