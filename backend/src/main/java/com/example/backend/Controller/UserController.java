package com.example.backend.Controller;

import com.example.backend.Model.Class.User;
import com.example.backend.Model.Enum.Role;
import com.example.backend.Model.Enum.UserRole;
import com.example.backend.Service.UserService;
import com.example.backend.Utility.GroupedResult;
import com.example.backend.Utility.TableRequest;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
            log.info("findByEmail() - Successful.");
            return ResponseEntity.ok(this.userService.getUserById(id));
        } catch (Exception e) {
            log.error("Failed to retrieve findByEmail(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get/by-name-email")
    public ResponseEntity<User> getUserByNameAndEmail(@RequestParam("name") final String name, @RequestParam("email") final String email) {
        try {
            log.info("getUserByNameAndEmail() - Successful.");
            return ResponseEntity.ok(this.userService.getUserByNameAndEmail(name, email));
        } catch (Exception e) {
            log.error("Failed to retrieve getUserByNameAndEmail(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get/by-email")
    public ResponseEntity<Boolean> getUserByEmail(@RequestParam("email") final String email) {
        try {
            log.info("getUserByEmail() - Successful.");
            return ResponseEntity.ok(this.userService.getUserByEmail(email));
        } catch (Exception e) {
            log.error("Failed to retrieve getUserByEmail(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get/different-role")
    public ResponseEntity<List<User>> getAllUserDifferentOnRole(@RequestParam("role") final UserRole role) {
        try {
            log.info("getAllUserDifferentOnRole() - Successful.");
            return ResponseEntity.ok(this.userService.getAllUserDifferentOnRole(role));
        } catch (Exception e) {
            log.error("Failed to retrieve getAllUserDifferentOnRole(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/post/new")
    public ResponseEntity<User> postNewUser(@RequestBody final User user) {
        try {
            log.info("postNewUser() - Successful.");
            return ResponseEntity.ok(this.userService.postNewUser(user));
        } catch (Exception e) {
            log.error("Failed to retrieve postNewUser(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
