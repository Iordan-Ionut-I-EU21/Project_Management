package com.example.backend.Mail;


import com.example.backend.Model.Class.Projects;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/sendEmail")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @GetMapping("/reset")
    public void sendEmailChangePassword(@RequestParam("email") String email) throws MessagingException, IOException {
        emailService.sendEmailChangePassword(email);
    }

}