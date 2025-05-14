package com.example.backend.Controller;

import com.example.backend.Service.ProjectsMembersService;
import lombok.Getter;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/projects/members")
@JBossLog
public class ProjectsMembersController {
    @Autowired
    private ProjectsMembersService projectsMembersService;

    @GetMapping("/get/count")
    public ResponseEntity<Long> getCountOfProjectsByUserEmail(@RequestParam("email") final String email) {
        try {
            log.info("getCountOfProjectsByUserEmail()- follower - Successful.");
            return ResponseEntity.ok(this.projectsMembersService.getCountOfProjectsByUserEmail(email));
        } catch (Exception e) {
            log.error("Failed to retrieve getCountOfProjectsByUserEmail(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(0L);
        }
    }
}
