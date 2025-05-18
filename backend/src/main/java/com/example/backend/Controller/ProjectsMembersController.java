package com.example.backend.Controller;

import com.example.backend.Model.Enum.Role;
import com.example.backend.Service.ProjectsMembersService;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @GetMapping("/count/by-role")
    public ResponseEntity<Map<Role, Long>> getCountByRole(@RequestParam("id") final String id) {
        try {
            log.info("getCountByRole() - Successful.");
            return ResponseEntity.ok(this.projectsMembersService.getCountByRole(id));
        } catch (Exception e) {
            log.error("Failed to retrieve getCountByRole(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
