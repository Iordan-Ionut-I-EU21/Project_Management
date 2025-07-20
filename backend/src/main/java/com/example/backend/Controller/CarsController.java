package com.example.backend.Controller;

import com.example.backend.Service.CarsService;
import com.example.backend.Utility.GroupedResult;
import com.example.backend.Utility.TableRequest;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/cars")
@JBossLog
public class CarsController {
    @Autowired
    private CarsService carsService;

    @PostMapping("/find/by")
    public ResponseEntity<GroupedResult> getDataByUserName(@RequestParam("name") final String name, @RequestBody TableRequest tableRequest) {
        try {
            log.info("getDataByUserName() - Successful.....");
            return ResponseEntity.ok(new GroupedResult(this.carsService.findByUsername(name, tableRequest), this.carsService.countByUsername(name)));
        } catch (Exception e) {
            log.error("Error in getDataByUserName: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/count/by")
    public ResponseEntity<Long> countByUsername(@RequestParam("name") final String name) {
        try {
            log.info("countByUsername() - Successful.....");
            return ResponseEntity.ok(this.carsService.countByUsername(name));
        } catch (Exception e) {
            log.error("Error in countByUsername: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/excel/find/by")
    public ResponseEntity<List<Object[]>> getExcelByUserName(@RequestParam("name") final String name, @RequestParam("columns") final String columns) {
        try {
            log.info("getExcelByUserName() - Successful.....");
            return ResponseEntity.ok(this.carsService.getExcelByUserName(name, columns));
        } catch (Exception e) {
            log.error("Error in getExcelByUserName: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
