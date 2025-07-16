package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.QualityChecks;
import com.example.backend.Model.Class.User;
import com.example.backend.Repository.QualityCheckRepository;
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
public class QualityChecksService {
    private static final String CACHEABLE = "Quality_Checks";
    @Autowired
    private QualityCheckRepository qualityCheckRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public void saveAll(List<QualityChecks> qualityChecks){
        this.qualityCheckRepository.saveAll(qualityChecks);
    }

    public List<QualityChecks> findAll(){
        return  this.qualityCheckRepository.findAll();
    }

    @Cacheable(cacheNames = CACHEABLE + "findByUserName", key = "#name  + '_' + #tableRequest.changePage.pageIndex + '_' + #tableRequest.changePage.pageSize + '_' + (#tableRequest.sortPage?.column ?: '') + '_' + (#tableRequest.sortPage?.direction ?: '')")
    public List<QualityChecks> findByUserName(final String name, final TableRequest tableRequest) {
        PageRequest pageRequest = BackendApplication.generateTablePage(tableRequest);
        return this.qualityCheckRepository.findByUserName(name, pageRequest);
    }

    @Cacheable(cacheNames = CACHEABLE + "countByUserName", key = "#name")
    public Long countByUserName(final String name) {
        return this.qualityCheckRepository.countByUserName(name);
    }

    @Cacheable(cacheNames = CACHEABLE + "getExcelByUserName", key = "#name + '_' + #columns")
    public List<Object[]> getExcelByUserName(final String name, final String columns) {
        TypedQuery<Object[]> query = this.entityManager.createQuery("SELECT " + columns + " FROM " + QualityChecks.class.getSimpleName() +
                " qc LEFT JOIN " + User.class.getSimpleName() + " u on u.employees_id.id = qc.inspector_id.id WHERE u.username = :name", Object[].class);
        query.setParameter("name", name);
        return BackendApplication.generateDateWithStartTimeAndEndTIme(query.getResultList(), columns);
    }
}
