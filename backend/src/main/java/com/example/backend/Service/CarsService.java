package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.Cars;
import com.example.backend.Model.Dto.CarsFiltersDTO;
import com.example.backend.Model.Dto.CountViewDTO;
import com.example.backend.Model.Enum.CarsStatus;
import com.example.backend.Repository.CarsRepository;
import com.example.backend.Utility.TableRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CarsService {
    private static final String CACHEABLE = "CARS";
    @Autowired
    private CarsRepository carsRepository;
    @PersistenceContext
    private EntityManager entityManager;

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

    @Cacheable(cacheNames = CACHEABLE + "findByUsernameAndCarsFilters", key = "#name  + '_' + (#tableRequest?.KEY ?: '') +@carsCacheKeyHelper.buildCarsKey(#carsFiltersDTO)")
    public List<Cars> findByUsernameAndCarsFilters(final String name, TableRequest tableRequest, final CarsFiltersDTO carsFiltersDTO) {
        PageRequest pageRequest = BackendApplication.generateTablePage(tableRequest);
        return this.carsRepository.findByUsernameAndCarsFilters(name, pageRequest, carsFiltersDTO.getModel_id_name(), carsFiltersDTO.getModel_id_generation(), carsFiltersDTO.getModel_id_release_year(), carsFiltersDTO.getVin(), carsFiltersDTO.getStatus());
    }

    @Cacheable(cacheNames = CACHEABLE + "countByUsernameAndCarsFilters", key = "#name  +'_' +@carsCacheKeyHelper.buildCarsKey(#carsFiltersDTO)")
    public Long countByUsernameAndCarsFilters(final String name, final CarsFiltersDTO carsFiltersDTO) {
        return this.carsRepository.countByUsernameAndCarsFilters(name, carsFiltersDTO.getModel_id_name(), carsFiltersDTO.getModel_id_generation(), carsFiltersDTO.getModel_id_release_year(), carsFiltersDTO.getVin(), carsFiltersDTO.getStatus());
    }

    @Cacheable(cacheNames = CACHEABLE + "getExcelByUserNameCarsFilters", key = "#username +'_'+ #columns+'_'+@carsCacheKeyHelper.buildCarsKey(#carsFiltersDTO)")
    public List<Object[]> getExcelByUserNameCarsFilters(final String username, final String columns, final CarsFiltersDTO carsFiltersDTO) {
        TypedQuery<Object[]> query = this.entityManager.createQuery(" SELECT DISTINCT " + columns + Cars.QUERY + " u.username = :username " + CarsFiltersDTO.QUERY, Object[].class);
        query.setParameter("username", username);
        query.setParameter("model_id_release_year", carsFiltersDTO.getModel_id_release_year());
        query.setParameter("status", carsFiltersDTO.getStatus());
        query.setParameter("vin", carsFiltersDTO.getVin());
        query.setParameter("model_id_generation", carsFiltersDTO.getModel_id_generation());
        query.setParameter("model_id_name", carsFiltersDTO.getModel_id_name());
        return BackendApplication.generateDateWithStartTimeAndEndTIme(query.getResultList(), columns);
    }

    @Cacheable(cacheNames = CACHEABLE + "countStatusByCarModelId", key = "#carModelId")
    public List<CountViewDTO> countStatusByCarModelId(final String carModelId) {
        return BackendApplication.generateObjectByStatus(this.carsRepository.countStatusByCarModelId(carModelId), CarsStatus.class);
    }
}
