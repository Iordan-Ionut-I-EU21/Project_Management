package com.example.backend.Controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class HelloController {
//    private final FakerDataService fakerService;
//
//    @Autowired
//    public HelloController(FakerDataService fakerService) {
//        System.out.println("asdasdasdada");
//        this.fakerService = fakerService;
//    }

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from Spring Boot!";
    };

    @GetMapping("/all")
    public ResponseEntity<List<String>> getAll(@RequestParam(defaultValue = "10") int num) {
        List<String> fakeData = new ArrayList<>();
        System.out.println("runnn2");
        for (int i = 0; i < num; i++) {
            fakeData.add("Fake Item " + (i + 1));
        }
        return ResponseEntity.ok(fakeData);
    }
//
//    @PostMapping("/all")
//    public ResponseEntity<Void> postAll(@RequestParam(value = "num", defaultValue = "1") final int number) {
//        System.out.println("runnn1");
//        try {
//            System.out.println("------------START------------");
//            long startTime = System.currentTimeMillis();
//
//            fakerService.generateUsers(number / 50);
//            fakerService.generateCategories(number);
//            fakerService.generateProjects(number);
//            fakerService.generateTasks(number);
//            fakerService.generateTaskComments(number);
//            fakerService.generateProjectsMembers(number);
//            fakerService.generateSubTasks(number);
//            fakerService.generateMilestones(number);
//            fakerService.generateAuditLogs(number);
//            fakerService.generateActivities(number);
//
//            long endTime = System.currentTimeMillis();
//            long duration = endTime - startTime;
//            long hours = duration / (1000 * 60 * 60);
//            long minutes = (duration % (1000 * 60 * 60)) / (1000 * 60);
//            long seconds = (duration % (1000 * 60)) / 1000;
//
//            String formattedDuration = String.format("%02d:%02d:%02d", hours, minutes, seconds);
//            System.out.println("All()- location - Successful....." + formattedDuration);
//            System.out.println("");
//            System.out.println("");
//            return ResponseEntity.status(HttpStatus.CREATED).build();
//        } catch (Exception e) {
//            System.out.println("Error posting all: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }

}
