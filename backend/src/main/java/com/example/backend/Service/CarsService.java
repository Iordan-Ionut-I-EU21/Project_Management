package com.example.backend.Service;

import com.example.backend.Model.Class.Cars;
import com.example.backend.Repository.CarsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CarsService {
    @Autowired
    private CarsRepository carsRepository;

    public void saveAll(List<Cars> cars) {
        this.carsRepository.saveAll(cars);
    }

    public List<Cars> findAll() {
        return this.carsRepository.findAll();
    }

    public Set<String> getAllVin() {
        return carsRepository.findAll().stream()
                .map(Cars::getVin)
                .collect(Collectors.toSet());
    }

    public Set<String> getAllModel() {
        return carsRepository.findAll().stream().map(car -> car.getModel_id().getName()).
                collect(Collectors.toSet());

    }
}
