package com.example.backend.Service;

import com.example.backend.Model.Class.PartProduction;
import com.example.backend.Repository.PartProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartProductionService {
    @Autowired
    private PartProductionRepository partProductionRepository;

    public void saveAll(List<PartProduction> partProduction){
        this.partProductionRepository.saveAll(partProduction);
    }
}
