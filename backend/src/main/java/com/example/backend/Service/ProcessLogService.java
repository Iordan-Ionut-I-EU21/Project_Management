package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.ProcessLog;
import com.example.backend.Model.Class.User;
import com.example.backend.Model.Enum.ProcessLogStatus;
import com.example.backend.Repository.ProcessLogRepository;
import com.example.backend.Utility.TableRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@JBossLog
public class ProcessLogService {
    private static final String CACHEABLE = "Process_Log";
    @Autowired
    private ProcessLogRepository processLogRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public void saveAll(List<ProcessLog> processLogs){
        this.processLogRepository.saveAll(processLogs);
    }

    public List<ProcessLog> findAll(){
        return this.processLogRepository.findAll();
    }

    @Cacheable(cacheNames = CACHEABLE + "findByNameAndStatus", key = "#name + '_' + #status + '_' + #tableRequest.changePage.pageIndex + '_' + #tableRequest.changePage.pageSize + '_' + (#tableRequest.sortPage?.column ?: '') + '_' + (#tableRequest.sortPage?.direction ?: '')")
    public List<ProcessLog> findByUserNameAndStatus(final String name, final ProcessLogStatus status, final TableRequest tableRequest) {
        PageRequest pageRequest = BackendApplication.generateTablePage(tableRequest);
        return this.processLogRepository.findByUserNameAndStatus(name, status, pageRequest);
    }

    @Cacheable(cacheNames = CACHEABLE + "countByNameAndStatus", key = "#name + '_'+ #status")
    public Long countByUserNameAndStatus(final String name, final ProcessLogStatus status) {
        return this.processLogRepository.countByUserNameAndStatus(name, status);
    }

    @Cacheable(cacheNames = CACHEABLE + "getExcelByUserNameAndStatus", key = "#name +'_'+#status +'_' +#columns")
    public List<Object[]> getExcelByUserNameAndStatus(final String name, final ProcessLogStatus status, final String columns) {
        TypedQuery<Object[]> query = this.entityManager.createQuery("SELECT " + columns + " FROM " + ProcessLog.class.getSimpleName() +
                " p LEFT JOIN " + User.class.getSimpleName() + " u ON u.employees_id.id = p.employee_id.id WHERE u.username = :name AND (:status IS NULL OR p.status = :status)", Object[].class);
        query.setParameter("name", name);
        query.setParameter("status", status);
        return BackendApplication.generateDateWithStartTimeAndEndTIme(query.getResultList(), columns);
    }
}
