package com.example.backend.Repository;

import com.example.backend.Model.Class.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, String> {
}
