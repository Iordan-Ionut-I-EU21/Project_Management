package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.SubTasks;
import com.example.backend.Repository.SubTasksRepository;
import com.example.backend.Utility.TableRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SubTasksService {
    @Autowired
    private SubTasksRepository subTasksRepository;

    public void postSubTasks(final List<SubTasks> subTasks) {
        this.subTasksRepository.saveAll(subTasks);
    }

    public List<SubTasks> getListById(final String taskId, final TableRequest tableRequest) {
        Pageable pageable = BackendApplication.generateTablePage(tableRequest);
        return this.subTasksRepository.getListById(taskId,pageable);
    }

    public Long getCountById(final String taskId){
        return this.subTasksRepository.getCountById(taskId);
    }
}
