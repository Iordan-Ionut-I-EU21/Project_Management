package com.example.backend.Controller;

import com.example.backend.Model.Enum.Status;
import com.example.backend.Service.ProjectsService;
import com.example.backend.Utility.GroupedResult;
import com.example.backend.Utility.TableRequest;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
