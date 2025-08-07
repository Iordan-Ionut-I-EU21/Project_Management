package com.example.backend.Controller;

import com.example.backend.Model.Dto.UserInformationDTO;
import com.example.backend.Service.UserService;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
@JBossLog
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/information")
    public ResponseEntity<UserInformationDTO> countInformation(@RequestParam("name") final String name, @RequestParam("machine_name_or_id") final String machine_name_or_id) {
        try {
            log.info("countInformation() - Successful.....");
            return ResponseEntity.ok(this.userService.countInformation(name, machine_name_or_id));
        } catch (Exception e) {
            log.error("Error in countInformationByUserNameORMachineNameOrMachineId: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
