package com.example.backend.Controller;

import com.example.backend.Model.Class.Projects;
import com.example.backend.Model.Enum.Status;
import com.example.backend.Service.ProjectsService;
import com.example.backend.Utility.GroupedResult;
import com.example.backend.Utility.TableRequest;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/projects")
@JBossLog
public class ProjectsController {
    @Autowired
    private ProjectsService projectsService;

    @PostMapping("/post/data")
    public ResponseEntity<GroupedResult> postDataOfProjectsByUserEmailAndStatus(@RequestParam("email") final String email, @RequestBody final TableRequest tableRequest) {
        try {
            log.info("postDataOfProjectsByUserEmailAndStatus()- follower - Successful.");
            return ResponseEntity.ok(new GroupedResult(this.projectsService.postDataOfProjectsByUserEmail(email, tableRequest), this.projectsService.getCountProjectsByUserEmail(email)));
        } catch (Exception e) {
            log.error("Failed to retrieve postDataOfProjectsByUserEmailAndStatus(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/count/status")
    public ResponseEntity<Map<Status, Long>> getStatusCounts(@RequestParam("projectId") final String projectId) {
        try {
            log.info("getStatusCounts() - Successful.");
            return ResponseEntity.ok(this.projectsService.getStatusCounts(projectId));
        } catch (Exception e) {
            log.error("Failed to retrieve getStatusCounts(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/post/list/by-projectId")
    public ResponseEntity<GroupedResult> getListByProjectId(@RequestParam("projectId") final String projectId, @RequestBody final TableRequest tableRequest) {
        try {
            log.info("getListByProjectId() - Successful.");
            return ResponseEntity.ok(new GroupedResult(this.projectsService.getListByProjectId(projectId, tableRequest), this.projectsService.getCountByProjectId(projectId)));
        } catch (Exception e) {
            log.error("Failed to retrieve getListByProjectId(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get/suggestion")
    public ResponseEntity<List<Projects>> getDataForSuggestion(@RequestParam("name") final String name) {
        try {
            log.info("getDataForSuggestion() - Successful.");
            return ResponseEntity.ok(this.projectsService.getDataForSuggestion(name));
        } catch (Exception e) {
            log.error("Failed to retrieve getDataForSuggestion(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/post/data/suggestion")
    public ResponseEntity<GroupedResult> postDataOfProjectsBySuggestion(@RequestParam("name") final String name, @RequestBody final TableRequest tableRequest) {
        try {
            log.info("postDataOfProjectsBySuggestion()- follower - Successful.");
            return ResponseEntity.ok(new GroupedResult(this.projectsService.postDataOfProjectsBySuggestion(name, tableRequest), this.projectsService.postCountOfProjectsBySuggestion(name)));
        } catch (Exception e) {
            log.error("Failed to retrieve postDataOfProjectsBySuggestion(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
