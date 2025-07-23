package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.*;
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

    @Cacheable(cacheNames = CACHEABLE + "findByUsername", key = "#name  + '_' + #tableRequest.changePage.pageIndex + '_' + #tableRequest.changePage.pageSize + '_' + (#tableRequest.sortPage?.column ?: '') + '_' + (#tableRequest.sortPage?.direction ?: '')")
    public List<Cars> findByUsername(final String name, TableRequest tableRequest) {
        PageRequest pageRequest = BackendApplication.generateTablePage(tableRequest);
        return this.carsRepository.findByUsername(name, pageRequest);
    }

    @Cacheable(cacheNames = CACHEABLE + "countByUsername", key = "#name")
    public Long countByUsername(final String name) {
        return this.carsRepository.countByUsername(name);
    }

    @Cacheable(cacheNames = CACHEABLE + "getExcelByUserName", key = "")
    public List<Object[]> getExcelByUserName(final String name, final String columns) {
        TypedQuery<Object[]> query = this.entityManager.createQuery(" SELECT DISTINCT " + columns + "  FROM " + Cars.class.getSimpleName() +
                " c LEFT JOIN " + CarParts.class.getSimpleName() + " cp ON c.id = cp.car_id.id LEFT JOIN " + Employees.class.getSimpleName() +
                " e ON cp.installed_by.id = e.id LEFT JOIN " + User.class.getSimpleName() + " u ON u.employees_id.id = e.id LEFT JOIN "
                + CarModel.class.getSimpleName() + " cm ON cm.id = c.model_id.id WHERE u.username = :name", Object[].class);
        query.setParameter("name", name);
        return BackendApplication.generateDateWithStartTimeAndEndTIme(query.getResultList(), columns);
    }

    @Cacheable(cacheNames = CACHEABLE + "countStatusByCarModelId", key = "#carModelId")
    public List<CountViewDTO> countStatusByCarModelId(final String carModelId) {
        return BackendApplication.generateObjectByStatus(this.carsRepository.countStatusByCarModelId(carModelId), CarsStatus.class);
    }
}
