package com.example.backend.Controller;

import com.example.backend.Service.FakerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/faker")
public class FakerController {
    private final FakerService fakerService;

    @Autowired
    public FakerController(FakerService fakerService) {
        this.fakerService = fakerService;
    }

    @GetMapping("")
    public ResponseEntity<List<String>> getAll1(@RequestParam(defaultValue = "10") int num) {
        List<String> fakeData = new ArrayList<>();
        System.out.println("runnn2");
        for (int i = 0; i < num; i++) {
            fakeData.add("Fake Item " + (i + 1));
        }
        return ResponseEntity.ok(fakeData);
    }

    @GetMapping("/all")
    public ResponseEntity<List<String>> getAll(@RequestParam(defaultValue = "10") int num) {
        List<String> fakeData = new ArrayList<>();
        System.out.println("runnn2");
        for (int i = 0; i < num; i++) {
            fakeData.add("Fake Item " + (i + 1));
        }
        return ResponseEntity.ok(fakeData);
    }

    @PostMapping("/all")
    public ResponseEntity<Void> postAll(@RequestParam(value = "num", defaultValue = "1") final int number) {
        System.out.println("runnn1");
        try {
            System.out.println("------------START------------");
            long startTime = System.currentTimeMillis();

            fakerService.generateUsers(number / 50);
            fakerService.generateCategories(number);
            fakerService.generateProjects(number);
            fakerService.generateTasks(number);
            fakerService.generateTaskComments(number);
            fakerService.generateProjectsMembers(number);
            fakerService.generateSubTasks(number);
            fakerService.generateMilestones(number);
            fakerService.generateAuditLogs(number);
            fakerService.generateActivities(number);

            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            long hours = duration / (1000 * 60 * 60);
            long minutes = (duration % (1000 * 60 * 60)) / (1000 * 60);
            long seconds = (duration % (1000 * 60)) / 1000;

            String formattedDuration = String.format("%02d:%02d:%02d", hours, minutes, seconds);
            System.out.println("All()- location - Successful....." + formattedDuration);
            System.out.println("");
            System.out.println("");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            System.out.println("Error posting all: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
