package com.example.backend.Repository;

import com.example.backend.Model.Class.Process;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProcessRepository extends JpaRepository<Process, String> {
    @Query("SELECT p FROM Process p WHERE p.name = :name")
    Optional<Process> findByName(@Param("name") final String name);
}
