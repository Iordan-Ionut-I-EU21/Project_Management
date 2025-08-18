package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.CarModel;
import com.example.backend.Model.Class.Suppliers;
import com.example.backend.Repository.CarModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CarModelService {
    private static final String CACHEABLE = "CAR_MODEL";
    @Autowired
    private CarModelRepository carModelRepository;

    public void saveAll(List<CarModel> carModels){
        this.carModelRepository.saveAll(carModels);
    }

    public List<CarModel> findAll(){
        return  this.carModelRepository.findAll();
    }

    @Cacheable(cacheNames = CACHEABLE + "findByName",key = "#name")
    public List<CarModel> findByName(final String name){
        return this.carModelRepository.findByName(name, BackendApplication.generatePaginateOfSearch());
    }

    public Set<String> getAllName() {
        return carModelRepository.findAll().stream()
                .map(CarModel::getName)
                .collect(Collectors.toSet());
    }
}
