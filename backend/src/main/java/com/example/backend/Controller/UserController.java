package com.example.backend.Controller;

import com.example.backend.Model.Class.User;
import com.example.backend.Service.UserService;
import com.example.backend.Utility.GroupedResult;
import com.example.backend.Utility.TableRequest;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
@JBossLog
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/get/by-id")
    public ResponseEntity<User> getUserById(@RequestParam("id") final String id) {
        try {
            log.info("findByEmail()- follower - Successful.");
            return ResponseEntity.ok(this.userService.getUserById(id));
        } catch (Exception e) {
            log.error("Failed to retrieve findByEmail(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
