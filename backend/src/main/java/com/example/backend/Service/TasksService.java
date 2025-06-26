package com.example.backend.Service;


import com.example.backend.BackendApplication;
import com.example.backend.Mail.EmailService;
import com.example.backend.Model.Class.Tasks;
import com.example.backend.Model.Class.User;
import com.example.backend.Model.Enum.Priority;
import com.example.backend.Model.Enum.Status;
import com.example.backend.Repository.ProjectsRepository;
import com.example.backend.Repository.TasksRepository;
import com.example.backend.Utility.TableRequest;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import okhttp3.internal.concurrent.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Service
public class TasksService {
    @Autowired
    private TasksRepository tasksRepository;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private EmailService emailService;

    public List<Tasks> findAllTasks() {
        return this.tasksRepository.findAll();
    }

    public List<User> findUserByTaskId(final String id) {
        return this.tasksRepository.findUserByTaskId(id);
    }

    public void postTasks(final List<Tasks> tasks) {
        this.tasksRepository.saveAll(tasks);
    }

    public Long getCountOfTasksByUserEmail(final String email, final Status status) {
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

    public List<Object[]> getExcelDataOfProjectsByUserEmailAndStatus(final String excel, final String email, final Status status) {
        TypedQuery<Object[]> query = this.entityManager.createQuery("select distinct " + excel + " from " + Tasks.class.getSimpleName() + " t where t.assignedId.email = :email and t.status = :status", Object[].class);
        query.setParameter("email", email);
        query.setParameter("status", status);
        return query.getResultList();
    }

    public Tasks postNewTask(final Tasks tasks) {
        tasks.setId(BackendApplication.generateId());
        return this.tasksRepository.save(tasks);
    }

    public Tasks getById(final String id) {
        return this.tasksRepository.getById(id);
    }

    public Tasks putTaskById(final String id, final Tasks tasks) throws MessagingException, IOException {
        return tasksRepository.findById(id).map(existingTask -> {
            // Update the task fields
            existingTask.setProjectId(tasks.getProjectId());
            existingTask.setDescription(tasks.getDescription());
            existingTask.setStatus(tasks.getStatus());
            existingTask.setTitle(tasks.getTitle());
            existingTask.setPriority(tasks.getPriority());
            existingTask.setDueDate(tasks.getDueDate());
            existingTask.setCreatedAt(tasks.getCreatedAt());
            existingTask.setAssignedId(tasks.getAssignedId());
            Tasks updatedTask = tasksRepository.save(existingTask);
            Long totalTasks = tasksRepository.findNumberOfTaskOnProject(tasks.getProjectId().getId());
            Long completedTasks = tasksRepository.findNumberOfTaskOnProjectByStatus(tasks.getProjectId().getId(), Status.COMPLETED);

            System.out.println("Total Tasks: " + totalTasks);
            System.out.println("Completed Tasks: " + completedTasks);

            if (totalTasks.equals(completedTasks)) {
                try {
                    emailService.sendEmailToManagerOfProject(tasks.getProjectId());
                } catch (MessagingException | IOException e) {
                    throw new RuntimeException("Failed to send email", e);
                }
            }

            return updatedTask;
        }).orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }


}
