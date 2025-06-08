package com.example.backend.Controller;

import com.example.backend.Model.Class.SubTasks;
import com.example.backend.Service.SubTasksService;
import com.example.backend.Utility.GroupedResult;
import com.example.backend.Utility.TableRequest;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/sub/tasks")
@JBossLog
public class SubTasksController {
    @Autowired
    private SubTasksService subTasksService;

    @PostMapping("/post/list/by-id")
    public ResponseEntity<GroupedResult> postListById(@RequestParam("taskId") final String taskId, @RequestBody final TableRequest tableRequest) {
        try {
            log.info("postListById() - Successful.");
            return ResponseEntity.ok(new GroupedResult(this.subTasksService.getListById(taskId, tableRequest), this.subTasksService.getCountById(taskId)));
        } catch (Exception e) {
            log.error("Failed to retrieve postListById(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping ("/get/list/by-id")
    public ResponseEntity<List<Object[]>> getExcelListById(@RequestParam("excel") final String excel,@RequestParam("taskId") final String taskId) {
        try {
            log.info("getExcelListById() - Successful.");
            return ResponseEntity.ok(this.subTasksService.getExcelListById(excel,taskId));
        } catch (Exception e) {
            log.error("Failed to retrieve getExcelListById(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
