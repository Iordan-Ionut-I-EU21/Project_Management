package com.example.backend.Service;


import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.TaskComments;
import com.example.backend.Repository.TasksCommentsRepository;
import com.example.backend.Repository.UserRepository;
import okhttp3.internal.concurrent.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasksCommentsService {
    @Autowired
    private TasksCommentsRepository tasksCommentsRepository;
    @Autowired
    private UserRepository userRepository;

    public void postTasksComments(final List<TaskComments> taskComments) {
        this.tasksCommentsRepository.saveAll(taskComments);
    }

    public List<TaskComments> getListByTaskId(final String taskId) {
        return this.tasksCommentsRepository.getListByTaskId(taskId);
    }

    public void postTaskComment(final TaskComments taskComments, final String email){
        taskComments.setId(BackendApplication.generateId());
        taskComments.setUserId(this.userRepository.findByEmail(email).get());
        this.tasksCommentsRepository.save(taskComments);
    }
}
