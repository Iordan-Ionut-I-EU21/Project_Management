package com.example.backend.Service;


import com.example.backend.Model.Class.Tasks;
import com.example.backend.Model.Class.User;
import com.example.backend.Model.Enum.Priority;
import com.example.backend.Model.Enum.Status;
import com.example.backend.Repository.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasksService {
    @Autowired
    private TasksRepository tasksRepository;

    public List<Tasks> findAllTasks() {
        return this.tasksRepository.findAll();
    }

    public List<User> findUserByTaskId(final String id) {
        return this.tasksRepository.findUserByTaskId(id);
    }

    public void postTasks(final List<Tasks> tasks) {
        this.tasksRepository.saveAll(tasks);
    }

    public Long getCountOfTasksByUserEmail(final String email, final Status status){
        return this.tasksRepository.getCountOfTasksByUserEmail(email, status);
    }
}
