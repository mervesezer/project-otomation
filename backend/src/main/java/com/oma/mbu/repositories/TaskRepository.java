package com.oma.mbu.repositories;

import com.oma.mbu.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
}
