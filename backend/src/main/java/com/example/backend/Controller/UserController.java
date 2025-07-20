package com.example.backend.Controller;

import com.example.backend.Model.Class.User;
import com.example.backend.Model.Dto.UserInformationDTO;
import com.example.backend.Service.UserService;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
@JBossLog
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/information")
    public ResponseEntity<UserInformationDTO> countInformationByUserName(@RequestParam("name") final String name) {
        try {
            log.info("countInformationByUserName() - Successful.....");
            return ResponseEntity.ok(this.userService.countInformationByUserName(name));
        } catch (Exception e) {
            log.error("Error in countInformationByUserName: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
