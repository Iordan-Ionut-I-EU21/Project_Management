package com.example.backend.Service;

import com.example.backend.Model.Class.ProcessLog;
import com.example.backend.Repository.ProcessLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcessLogService {
    @Autowired
    private ProcessLogRepository processLogRepository;

    public void saveAll(List<ProcessLog> processLogs){
        this.processLogRepository.saveAll(processLogs);
    }

    public List<ProcessLog> findAll(){
        return this.processLogRepository.findAll();
    }
}
