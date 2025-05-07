package com.example.backend.Service;


import com.example.backend.Model.Class.SubTasks;
import com.example.backend.Repository.SubTasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubTasksService {
    @Autowired
    private SubTasksRepository subTasksRepository;

    public void postSubTasks(final List<SubTasks> subTasks) {
        this.subTasksRepository.saveAll(subTasks);
    }
}
