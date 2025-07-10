package com.example.backend.Generate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/all")
    public ResponseEntity<Void> postAll(@RequestParam(value = "num", defaultValue = "1") final int number) {
        LOG.info("runnn1");
        try {
            LOG.info("------------START------------");
            long startTime = System.currentTimeMillis();

            this.genService.generateUserAndEmployee(40);
            LOG.info("------------UserAndEmployee------------");
            this.genService.generateSuppliers(100);
            LOG.info("------------Suppliers------------");
            this.genService.generateProcess(number);
            LOG.info("------------Process------------");
            this.genService.generateCarModel(number);
            LOG.info("------------CarModel------------");
            this.genService.generateParts(number);
            LOG.info("------------Parts------------");
            this.genService.generateMachines(number);
            LOG.info("------------Machines------------");
            this.genService.generateCars(100);
            LOG.info("------------Cars------------");
            this.genService.generateCarParts(number);
            LOG.info("------------CarParts------------");
            this.genService.generatePartProduction(number);
            LOG.info("------------PartProduction------------");
            this.genService.generatePartSuppliers(number);
            LOG.info("------------PartSuppliers------------");
            this.genService.generateProcessLog(number);
            LOG.info("------------ProcessLog------------");
            this.genService.generateQualityChecks(number);
            LOG.info("------------QualityChecks------------");

            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            long hours = duration / (1000 * 60 * 60);
            long minutes = (duration % (1000 * 60 * 60)) / (1000 * 60);
            long seconds = (duration % (1000 * 60)) / 1000;

            String formattedDuration = String.format("%02d:%02d:%02d", hours, minutes, seconds);
            LOG.info("All() - Successful....." + formattedDuration);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.info("Error posting all: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/need")
    public ResponseEntity<Void> postNeedData(@RequestParam(value = "num", defaultValue = "1") final int number) {
        LOG.info("runnn1");
        try {
            LOG.info("------------START------------");
            long startTime = System.currentTimeMillis();

            this.genService.generateUserAndEmployee(number);
            this.genService.generateSuppliers(number);
            this.genService.generateProcess(number);

            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            long hours = duration / (1000 * 60 * 60);
            long minutes = (duration % (1000 * 60 * 60)) / (1000 * 60);
            long seconds = (duration % (1000 * 60)) / 1000;

            String formattedDuration = String.format("%02d:%02d:%02d", hours, minutes, seconds);
            LOG.info("postNeedData() - Successful....." + formattedDuration);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            LOG.info("Error posting all: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

