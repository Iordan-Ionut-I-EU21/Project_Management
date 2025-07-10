package com.example.backend.Service;

import com.example.backend.Model.Class.QualityChecks;
import com.example.backend.Repository.QualityCheckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QualityChecksService {
    @Autowired
    private QualityCheckRepository qualityCheckRepository;

    public void saveAll(List<QualityChecks> qualityChecks){
        this.qualityCheckRepository.saveAll(qualityChecks);
    }

    public List<QualityChecks> findAll(){
        return  this.qualityCheckRepository.findAll();
    }
}
