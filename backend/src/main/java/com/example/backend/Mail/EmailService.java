package com.example.backend.Mail;

import com.example.backend.Authentication.JWT;
import com.example.backend.Model.Class.Projects;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.IOException;
import java.util.Random;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;
    @Autowired
    private JWT jwt;
    @Autowired
    private TemplateEngine templateEngine;

    public void sendEmailChangePassword(String email) throws MessagingException, IOException {
        int randomNumber = 100000 + new Random().nextInt(900000);

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);

        messageHelper.setTo(email);
        messageHelper.setSubject("Change password Project_Management");
        messageHelper.setFrom("Project_Management@support.com");

        Context context = new Context();
        context.setVariable("code", randomNumber);
        context.setVariable("email", email);
        context.setVariable("link", "http://localhost:4200/authentication/otp?token=" + jwt.generateToken(randomNumber + "", email));
        String emailContent = templateEngine.process("reset.html", context);
        messageHelper.setText(emailContent, true);

        emailSender.send(mimeMessage);
    }

    public void sendEmailToManagerOfProject(Projects project) throws MessagingException, IOException {
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);

        messageHelper.setTo(project.getManagerId().getEmail());
        messageHelper.setSubject("Change password Project_Management");
        messageHelper.setFrom("Project_Management@support.com");

        Context context = new Context();
        context.setVariable("projectName", project.getName());
        context.setVariable("categoryName", project.getCategoryId().getName());
        context.setVariable("categoryDescription", project.getCategoryId().getDescription());
        context.setVariable("description", project.getDescription());
        context.setVariable("managerName", project.getManagerId().getName());
        context.setVariable("startDate", project.getStartDate());
        context.setVariable("endDate", project.getEndDate());
        String emailContent = templateEngine.process("email.html", context);
        messageHelper.setText(emailContent, true);

        emailSender.send(mimeMessage);
    }
}


