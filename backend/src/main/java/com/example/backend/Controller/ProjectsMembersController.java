package com.example.backend.Controller;

import com.example.backend.Model.Class.Projects;
import com.example.backend.Model.Class.ProjectsMembers;
import com.example.backend.Model.Enum.Role;
import com.example.backend.Model.Enum.Status;
import com.example.backend.Service.ProjectsMembersService;
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
@RequestMapping("/api/projects/members")
@JBossLog
public class ProjectsMembersController {
    @Autowired
    private ProjectsMembersService projectsMembersService;

    @GetMapping("/get/count")
    public ResponseEntity<Long> getCountOfProjectsByUserEmail(@RequestParam("email") final String email) {
        try {
            log.info("getCountOfProjectsByUserEmail() - Successful.");
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

    @PostMapping("/post/new")
    public ResponseEntity<ProjectsMembers> postNewProjectMembers(@RequestBody final ProjectsMembers projectsMembers) {
        try {
            log.info("postNewProjectMembers() - Successful.");
            return ResponseEntity.ok(this.projectsMembersService.postNewProjectMembers(projectsMembers));
        } catch (Exception e) {
            log.error("Failed to retrieve postNewProjectMembers(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/post/data")
    public ResponseEntity<GroupedResult> postDataUsersByProjectId(@RequestParam("projectId") final String projectId, @RequestBody final TableRequest tableRequest) {
        try {
            log.info("postDataUsersByProjectId() - Successful.");
            return ResponseEntity.ok(new GroupedResult(this.projectsMembersService.getDataUsersByProjectId(projectId, tableRequest), this.projectsMembersService.getCountUsersByProjectId(projectId)));
        } catch (Exception e) {
            log.error("Failed to retrieve postDataUsersByProjectId(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get/excel")
    public ResponseEntity<List<Object[]>> getExcelUsersByProjectId(@RequestParam("excel") final String excel, @RequestParam("projectId") final String projectId) {
        try {
            log.info("getExcelUsersByProjectId() - Successful.");
            return ResponseEntity.ok(this.projectsMembersService.getExcelUsersByProjectId(excel, projectId));
        } catch (Exception e) {
            log.error("Failed to retrieve getExcelUsersByProjectId(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
