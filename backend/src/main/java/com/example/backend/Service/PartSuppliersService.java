package com.example.backend.Service;

import com.example.backend.Model.Class.PartSuppliers;
import com.example.backend.Repository.PartSuppliersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartSuppliersService {
    @Autowired
    private PartSuppliersRepository partSuppliersRepository;

    public void saveAll(List<PartSuppliers> partSuppliers){
        this.partSuppliersRepository.saveAll(partSuppliers);
    }

    public List<PartSuppliers> findAll(){
        return this.partSuppliersRepository.findAll();
    }
}
