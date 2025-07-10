package com.example.backend.Service;

import com.example.backend.Model.Class.Machines;
import com.example.backend.Repository.MachinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MachinesService {
    @Autowired
    private MachinesRepository machinesRepository;

    public void saveAll(List<Machines> machines){
        this.machinesRepository.saveAll(machines);
    }

    public List<Machines> findAll(){
        return this.machinesRepository.findAll();
    }
}
