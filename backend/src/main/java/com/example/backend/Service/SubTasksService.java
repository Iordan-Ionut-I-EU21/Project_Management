package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.SubTasks;
import com.example.backend.Repository.SubTasksRepository;
import com.example.backend.Utility.TableRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;


@Service
public class SubTasksService {
    @Autowired
    private SubTasksRepository subTasksRepository;
    @Autowired
    private EntityManager entityManager;

    public void postSubTasks(final List<SubTasks> subTasks) {
        this.subTasksRepository.saveAll(subTasks);
    }

    public List<SubTasks> getListById(final String taskId, final TableRequest tableRequest) {
        Pageable pageable = BackendApplication.generateTablePage(tableRequest);
        return this.subTasksRepository.getListById(taskId, pageable);
    }

    public List<Object[]> getExcelListById(final String excel, final String taskId) {
        TypedQuery<Object[]> query = this.entityManager.createQuery("select distinct " + excel + " from " + SubTasks.class.getSimpleName() + " st where st.taskId.id = :taskId", Object[].class);
        query.setParameter("taskId", taskId);
        return query.getResultList();
    }

    public Long getCountById(final String taskId) {
        return this.subTasksRepository.getCountById(taskId);
    }
}
