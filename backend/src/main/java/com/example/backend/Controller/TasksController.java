package com.example.backend.Controller;

import com.example.backend.Model.Class.Tasks;
import com.example.backend.Model.Enum.Priority;
import com.example.backend.Model.Enum.Status;
import com.example.backend.Service.TasksService;
import com.example.backend.Utility.GroupedResult;
import com.example.backend.Utility.TableRequest;
import lombok.extern.jbosslog.JBossLog;
import okhttp3.internal.concurrent.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/tasks")
@JBossLog
public class TasksController {
    @Autowired
    private TasksService tasksService;

    @GetMapping("/get/count")
    public ResponseEntity<Long> getCountOfTasksByUserEmail(@RequestParam("email") final String email, @RequestParam("status") final Status status) {
        try {
            log.info("getCountOfTasksByUserEmail() - Successful.");
            return ResponseEntity.ok(this.tasksService.getCountOfTasksByUserEmail(email, status));
        } catch (Exception e) {
            log.error("Failed to retrieve getCountOfTasksByUserEmail(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(0L);
        }
    }

    @GetMapping("/count/by-id-status-priority")
    public ResponseEntity<Map<Priority, Map<Status, Long>>> countByUserIdAndStatusAndPriority(@RequestParam("id") final String id) {
        try {
            log.info("countByUserIdAndStatusAndPriority() - Successful.");
            return ResponseEntity.ok(this.tasksService.countByUserIdAndStatusAndPriority(id));
        } catch (Exception e) {
            log.error("Failed to retrieve countByUserIdAndStatusAndPriority(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/post/data")
    public ResponseEntity<GroupedResult> postDataOfProjectsByUserEmailAndStatus(@RequestParam("email") final String email, @RequestParam("status") final Status status, @RequestBody final TableRequest tableRequest) {
        try {
            log.info("postDataOfProjectsByUserEmail() - Successful.");
            return ResponseEntity.ok(new GroupedResult(this.tasksService.postDataOfProjectsByUserEmailAndStatus(email, status, tableRequest), this.tasksService.getCountOfTasksByUserEmail(email, status)));
        } catch (Exception e) {
            log.error("Failed to retrieve postDataOfProjectsByUserEmail(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get/by-id")
    public ResponseEntity<Tasks> getById(@RequestParam("id") final String id) {
        try {
            log.info("getById() - Successful.");
            return ResponseEntity.ok(this.tasksService.getById(id));
        } catch (Exception e) {
            log.error("Failed to retrieve getById(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tasks> putTaskById(@PathVariable String id, @RequestBody Tasks tasks) {
        try {
            log.info("putTaskById() - Successful.");
            return ResponseEntity.ok(this.tasksService.putTaskById(id, tasks));
        } catch (Exception e) {
            log.error("Failed to retrieve putTaskById(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/post/new")
    public ResponseEntity<Tasks> postNewTask(@RequestBody Tasks tasks) {
        try {
            log.info("postNewTask() - Successful.");
            return ResponseEntity.ok(this.tasksService.postNewTask(tasks));
        } catch (Exception e) {
            log.error("Failed to retrieve postNewTask(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
