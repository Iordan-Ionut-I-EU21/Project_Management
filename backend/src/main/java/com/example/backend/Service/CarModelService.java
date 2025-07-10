package com.example.backend.Service;

import com.example.backend.Model.Class.CarModel;
import com.example.backend.Model.Class.Suppliers;
import com.example.backend.Repository.CarModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CarModelService {
    @Autowired
    private CarModelRepository carModelRepository;

    public void saveAll(List<CarModel> carModels){
        this.carModelRepository.saveAll(carModels);
    }

    public List<CarModel> findAll(){
        return  this.carModelRepository.findAll();
    }

    public CarModel findByName(final String name){
        return this.carModelRepository.findByName(name);
    }

    public Set<String> getAllName() {
        return carModelRepository.findAll().stream()
                .map(CarModel::getName)
                .collect(Collectors.toSet());
    }
}
