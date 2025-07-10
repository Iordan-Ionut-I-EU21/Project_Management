package com.example.backend.Service;

import com.example.backend.Model.Class.Suppliers;
import com.example.backend.Model.Class.User;
import com.example.backend.Repository.SuppliersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SuppliersService {
    @Autowired
    private SuppliersRepository suppliersRepository;

    public void saveAll(List<Suppliers> suppliers) {
        this.suppliersRepository.saveAll(suppliers);
    }

    public List<Suppliers> findAll() {
        return this.suppliersRepository.findAll();
    }

    public Optional<Suppliers> findByName(final String name){
        return  this.suppliersRepository.findByName(name);
    }

    public Set<String> getAllName() {
        return suppliersRepository.findAll().stream()
                .map(Suppliers::getName)
                .collect(Collectors.toSet());
    }
}
