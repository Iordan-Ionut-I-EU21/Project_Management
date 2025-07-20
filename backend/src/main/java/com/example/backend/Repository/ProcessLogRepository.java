package com.example.backend.Repository;

import com.example.backend.Model.Class.ProcessLog;
import com.example.backend.Model.Enum.ProcessLogStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessLogRepository extends JpaRepository<ProcessLog, String> {
    @Query("SELECT p FROM ProcessLog p LEFT JOIN User u on u.employees_id.id = p.employee_id.id " + " WHERE u.username = :name AND (:status IS NULL OR p.status = :status)")
    List<ProcessLog> findByUserNameAndStatus(@Param("name") final String name, @Param("status") ProcessLogStatus status, Pageable pageable);

    @Query("SELECT count(p.id) FROM ProcessLog p LEFT JOIN User u on u.employees_id.id = p.employee_id.id " + " WHERE u.username = :name AND (:status IS NULL OR p.status = :status)")
    Long countByUserNameAndStatus(@Param("name") final String name, @Param("status") ProcessLogStatus status);
}