package com.example.backend.Service;


import com.example.backend.Model.Class.TaskComments;
import com.example.backend.Repository.TasksCommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasksCommentsService {
    @Autowired
    private TasksCommentsRepository tasksCommentsRepository;

    public void postTasksComments(final List<TaskComments> taskComments) {
        this.tasksCommentsRepository.saveAll(taskComments);
    }
}
