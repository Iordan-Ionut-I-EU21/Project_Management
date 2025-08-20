package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.Machines;
import com.example.backend.Model.Dto.CountViewDTO;
import com.example.backend.Model.Enum.MachineStatus;
import com.example.backend.Model.Enum.ProcessLogStatus;
import com.example.backend.Repository.MachinesRepository;
import com.example.backend.Utility.TableRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

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

	@Cacheable(cacheNames = CACHEABLE + "findMachinesByNameOrId", key = "#machine_name_or_id")
	public Machines findMachinesByNameOrId(final String machine_name_or_id) {
		return this.machinesRepository.findMachinesByNameOrId(machine_name_or_id);
	}

	@Cacheable(cacheNames = CACHEABLE + "countPartProductionByMachineNameOrIdAndUsername", key = "#machine_name_or_id+'_' + #username")
	public Long countPartProductionByMachineNameOrIdAndUsername(final String machine_name_or_id, final String username) {
		return this.machinesRepository.countPartProductionByMachineNameOrIdAndUsername(machine_name_or_id, username);
	}

	@Cacheable(cacheNames = CACHEABLE + "countProcessLogByMachineNameOrIdAndUsername", key = "#machine_name_or_id+'_' + #username")
	public Long countProcessLogByMachineNameOrIdAndUsername(final String machine_name_or_id, final String username) {
		return this.machinesRepository.countProcessLogByMachineNameOrIdAndUsername(machine_name_or_id, username);
	}

	@Cacheable(cacheNames =  CACHEABLE + "canAccessPage", key = "#machine_name_or_id + '_' + #username")
	public Boolean canAccessPage(final String machine_name_or_id, final String username) {
		Long countProcessLogByMachineNameOrIdAndUsername = this.countProcessLogByMachineNameOrIdAndUsername(machine_name_or_id, username);
		Long countPartProductionByMachineNameOrIdAndUsername = this.countPartProductionByMachineNameOrIdAndUsername(machine_name_or_id, username);
		return countPartProductionByMachineNameOrIdAndUsername == 0 && countProcessLogByMachineNameOrIdAndUsername == 0;
    }

	@Transactional
	@CacheEvict(cacheNames = CACHEABLE + "findMachinesByNameOrId", key = "#machine_name_or_id")
	public Integer updateMachineStatus(final String machine_name_or_id, final MachineStatus status) {
		return this.machinesRepository.updateMachineStatus(machine_name_or_id, status);
	}

	@Cacheable(cacheNames = CACHEABLE +"findMachinesByName" , key = "#machine_name")
	public List<Machines> findMachinesByName(final String machine_name){
		return this.machinesRepository.findMachinesByName(machine_name, BackendApplication.generatePaginateOfSearch());
	}

	public void save(Machines machine){
		machine.setId(BackendApplication.generateId());
		this.machinesRepository.save(machine);
	}

	@Cacheable(cacheNames = CACHEABLE + "findAllBy", key = "@tableRequestCacheKeyHelper.buildProcessLogKey(#tableRequest) ")
	public List<Machines> findAllBy(TableRequest tableRequest){
		PageRequest pageRequest = BackendApplication.generateTablePage(tableRequest);
		return this.machinesRepository.findAllBy(pageRequest);
	}

	@Cacheable(cacheNames = CACHEABLE + "countAllBy")
	public Long countAllBy(){
		return this.machinesRepository.countAllBy();
	}
}
