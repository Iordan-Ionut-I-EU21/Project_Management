package com.example.backend.Controller;

import com.example.backend.Model.Class.TaskComments;
import com.example.backend.Service.TasksCommentsService;
import com.example.backend.Utility.GroupedResult;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/task/comments")
@JBossLog
public class TaskCommentsController {
    @Autowired
    private TasksCommentsService tasksCommentsService;

    @GetMapping("/get/list/by-taskId")
    public ResponseEntity<List<TaskComments>> getListByTaskId(@RequestParam("taskId") final String taskId) {
        try {
            log.info("postListById() - Successful.");
            return ResponseEntity.ok(this.tasksCommentsService.getListByTaskId(taskId));
        } catch (Exception e) {
            log.error("Failed to retrieve getListByTaskId(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
