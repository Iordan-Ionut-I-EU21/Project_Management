package com.example.backend.Controller;

import com.example.backend.Model.Enum.Priority;
import com.example.backend.Model.Enum.Status;
import com.example.backend.Service.TasksService;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            log.info("getCountOfTasksByUserEmail()- follower - Successful.");
            return ResponseEntity.ok(this.tasksService.getCountOfTasksByUserEmail(email, status));
        } catch (Exception e) {
            log.error("Failed to retrieve getCountOfTasksByUserEmail(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(0L);
        }
    }
}
