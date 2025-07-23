package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.Cars;
import com.example.backend.Model.Class.Parts;
import com.example.backend.Repository.PartsRepository;
import com.example.backend.Utility.TableRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartsService {
    private final static String CACHEABLE = "Parts";
    @Autowired
    private PartsRepository partsRepository;

    public void saveAll(List<Parts> parts) {
        this.partsRepository.saveAll(parts);
    }

    public List<Parts> findAll(){
        return this.partsRepository.findAll();
    }
}
