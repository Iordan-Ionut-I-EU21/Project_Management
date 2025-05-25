package com.example.backend.Service;


import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.Tasks;
import com.example.backend.Model.Class.User;
import com.example.backend.Model.Enum.Priority;
import com.example.backend.Model.Enum.Status;
import com.example.backend.Repository.TasksRepository;
import com.example.backend.Utility.TableRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

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

    public Map<Priority, Map<Status, Long>> countByUserIdAndStatusAndPriority(final String id) {
        Map<Priority, Map<Status, Long>> result = new EnumMap<>(Priority.class);
        for (Priority priority : Priority.values()) {
            Map<Status, Long> add = new EnumMap<>(Status.class);
            for (Status status : Status.values()) {
                add.put(status, this.tasksRepository.countByUserIdAndStatusAndPriority(id, priority, status));
            }
            result.put(priority, add);
        }
        return result;
    }

    public List<Tasks> postDataOfProjectsByUserEmailAndStatus(final String email, final Status status, final TableRequest tableRequest) {
        Pageable pageable = BackendApplication.generateTablePage(tableRequest);
        return this.tasksRepository.postDataOfProjectsByUserEmailAndStatus(email, status, pageable);
    }

    public Tasks getById(final String id){
        return this.tasksRepository.getById(id);
    }

    public Tasks putTaskById(final String id, final Tasks tasks){
        return tasksRepository.findById(id)
                .map(task -> {
                    task.setProjectId(tasks.getProjectId());
                    task.setDescription(tasks.getDescription());
                    task.setStatus(tasks.getStatus());
                    task.setTitle(tasks.getTitle());
                    task.setPriority(tasks.getPriority());
                    task.setDueDate(tasks.getDueDate());
                    task.setCreatedAt(tasks.getCreatedAt());
                    task.setAssignedId(tasks.getAssignedId());
                    return tasksRepository.save(task);
                })
                .orElseThrow(() -> new RuntimeException("Tasks not found with id " + id));
    }

}
