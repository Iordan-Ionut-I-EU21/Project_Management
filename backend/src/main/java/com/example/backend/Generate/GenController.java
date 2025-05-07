package com.example.backend.Generate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/faker")
public class GenController {
    private final GenService genService;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(GenController.class);

    @Autowired
    public GenController(GenService genService) {
        this.genService = genService;
    }

    @GetMapping("/all")
    public ResponseEntity<String> getAll(@RequestParam(defaultValue = "10") int num) {

        return ResponseEntity.ok(genService.generate());
    }

    @PostMapping("/all")
    public ResponseEntity<Void> postAll(@RequestParam(value = "num", defaultValue = "1") final int number) {
        LOG.info("runnn1");
        try {
            LOG.info("------------START------------");
            long startTime = System.currentTimeMillis();

            genService.generateUsers(number / 50);
            genService.generateCategories(number);
            genService.generateProjects(number);
            genService.generateTasks(number);
            genService.generateTaskComments(number);
            genService.generateProjectsMembers(number);
            genService.generateSubTasks(number);
            genService.generateMilestones(number);
            genService.generateAuditLogs(number);
            genService.generateActivities(number);

            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            long hours = duration / (1000 * 60 * 60);
            long minutes = (duration % (1000 * 60 * 60)) / (1000 * 60);
            long seconds = (duration % (1000 * 60)) / 1000;

            String formattedDuration = String.format("%02d:%02d:%02d", hours, minutes, seconds);
            LOG.info("All() - Successful....." + formattedDuration);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            System.out.println("Error posting all: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

