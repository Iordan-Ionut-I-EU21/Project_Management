package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.CarParts;
import com.example.backend.Model.Class.Employees;
import com.example.backend.Model.Class.User;
import com.example.backend.Repository.CarsPartsRepository;
import com.example.backend.Utility.TableRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarsPartsService {
    private static final String CACHEABLE = "Cars_Parts";
    @Autowired
    private CarsPartsRepository carsPartsRepository;
    @PersistenceContext
    private EntityManager entityManager;
    public void saveAll(List<CarParts> carParts){
        this.carsPartsRepository.saveAll(carParts);
    }

    @Cacheable(cacheNames = CACHEABLE + "findByUsername", key = "#name  + '_' + #tableRequest.changePage.pageIndex + '_' + #tableRequest.changePage.pageSize + '_' + (#tableRequest.sortPage?.column ?: '') + '_' + (#tableRequest.sortPage?.direction ?: '')")
    public List<CarParts> findByUserName(final String name, TableRequest tableRequest) {
        PageRequest pageRequest = BackendApplication.generateTablePage(tableRequest);
        return this.carsPartsRepository.findByUserName(name, pageRequest);
    }

    @Cacheable(cacheNames = CACHEABLE + "countByUsername", key = "#name")
    public Long countByUserName(final String name) {
        return this.carsPartsRepository.countByUserName(name);
    }

    @Cacheable(cacheNames = CACHEABLE + "getExcelByUserName", key = "#username")
    public List<Object[]> getExcelByUserName(final String username, final String columns) {
        TypedQuery<Object[]> query = this.entityManager.createQuery("SELECT " + columns + " FROM " + CarParts.class.getSimpleName() + " cp LEFT JOIN " + Employees.class.getSimpleName() + " e ON e.id = cp.installed_by.id LEFT JOIN " + User.class.getSimpleName() + " u ON u.employees_id.id = e.id WHERE u.username = :username", Object[].class);
        query.setParameter("username", username);
        return BackendApplication.generateDateWithStartTimeAndEndTIme(query.getResultList(), columns);
    }
}
