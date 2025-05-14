package com.example.backend.Controller;

import com.example.backend.Model.Class.Projects;
import com.example.backend.Service.ProjectsService;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/projects")
@JBossLog
public class ProjectsController {
    @Autowired
    private ProjectsService projectsService;

    @GetMapping("/get/data")
    public ResponseEntity<List<Projects>> getDataOfProjectsByUserEmail(@RequestParam("email") final String email) {
        try {
            log.info("getDataOfProjectsByUserEmail()- follower - Successful.");
            return ResponseEntity.ok(this.projectsService.getDataOfProjectsByUserEmail(email));
        } catch (Exception e) {
            log.error("Failed to retrieve getDataOfProjectsByUserEmail(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonList(new Projects()));
        }
    }
}
