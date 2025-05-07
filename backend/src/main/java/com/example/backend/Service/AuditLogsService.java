package com.example.backend.Service;


import com.example.backend.Model.Class.AuditLogs;
import com.example.backend.Repository.AuditLogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditLogsService {
    @Autowired
    private AuditLogsRepository auditLogsRepository;

    public void postAuditLogs(final List<AuditLogs> auditLogs) {
        this.auditLogsRepository.saveAll(auditLogs);
    }
}
