package com.example.backend.Service;

import com.example.backend.Model.Class.Process;
import com.example.backend.Model.Class.Suppliers;
import com.example.backend.Repository.ProcessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProcessService {
    @Autowired
    private ProcessRepository processRepository;

    public void saveAll(List<Process> processes){
        this.processRepository.saveAll(processes);
    }

    public List<Process> findAll(){
        return  this.processRepository.findAll();
    }

    public Optional<Process> findByName(final String name){
        return  this.processRepository.findByName(name);
    }

    public Set<String> getAllName() {
        return processRepository.findAll().stream()
                .map(Process::getName)
                .collect(Collectors.toSet());
    }
}
