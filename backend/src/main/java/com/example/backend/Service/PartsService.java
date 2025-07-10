package com.example.backend.Service;

import com.example.backend.Model.Class.Parts;
import com.example.backend.Repository.PartsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartsService {
    @Autowired
    private PartsRepository partsRepository;

    public void saveAll(List<Parts> parts) {
        this.partsRepository.saveAll(parts);
    }

    public List<Parts> findAll(){
        return this.partsRepository.findAll();
    }
}
