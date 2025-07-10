package com.example.backend.Service;

import com.example.backend.Model.Class.CarParts;
import com.example.backend.Repository.CarsPartsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarsPartsService {
    @Autowired
    private CarsPartsRepository carsPartsRepository;

    public void saveAll(List<CarParts> carParts){
        this.carsPartsRepository.saveAll(carParts);
    }
}
