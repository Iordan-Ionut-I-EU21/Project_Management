package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.Machines;
import com.example.backend.Model.Dto.CountViewDTO;
import com.example.backend.Model.Enum.ProcessLogStatus;
import com.example.backend.Model.View.CountView;
import com.example.backend.Repository.MachinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MachinesService {
    private static final String CACHEABLE = "Machines";
    @Autowired
    private MachinesRepository machinesRepository;

    public void saveAll(List<Machines> machines){
        this.machinesRepository.saveAll(machines);
    }

    public List<Machines> findAll(){
        return this.machinesRepository.findAll();
    }

    @Cacheable(cacheNames = CACHEABLE + "countStatusByMachineId", key = "#machineId")
    public List<CountViewDTO> countStatusByMachineId(final String machineId) {
        return BackendApplication.generateObjectByStatus(this.machinesRepository.countStatusByMachineId(machineId), ProcessLogStatus.class);
    }

    @Cacheable(cacheNames = CACHEABLE+"findMachinesByKey", key = "#key")
    public Machines findMachinesByKey(final String key){
        return this.machinesRepository.findMachinesByKey(key);
    }
}
