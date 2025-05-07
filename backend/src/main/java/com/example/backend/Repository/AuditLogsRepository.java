package com.example.backend.Repository;


import com.example.backend.Model.Class.AuditLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditLogsRepository extends JpaRepository<AuditLogs, String> {
}
