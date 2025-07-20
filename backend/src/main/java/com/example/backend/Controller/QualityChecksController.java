package com.example.backend.Controller;

import com.example.backend.Service.QualityChecksService;
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
@RequestMapping("/api/quality/checks")
@JBossLog
public class QualityChecksController {
    @Autowired
    private QualityChecksService qualityChecksService;

    @PostMapping("/find/by")
    public ResponseEntity<GroupedResult> getDataByUserName(@RequestParam("name") final String name, @RequestBody TableRequest tableRequest) {
        try {
            log.info("getDataByUserName() - Successful.....");
            return ResponseEntity.ok(new GroupedResult(this.qualityChecksService.findByUserName(name, tableRequest), this.qualityChecksService.countByUserName(name)));
        } catch (Exception e) {
            log.error("Error in getDataByUserName: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/count/by")
    public ResponseEntity<Long> countByUserName(@RequestParam("name") final String name) {
        try {
            log.info("countByUserName() - Successful.....");
            return ResponseEntity.ok(this.qualityChecksService.countByUserName(name));
        } catch (Exception e) {
            log.error("Error in countByUserName: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/excel/find/by")
    public ResponseEntity<List<Object[]>> getExcelByUserName(@RequestParam("name") final String name, @RequestParam("columns") final String columns) {
        try {
            log.info("getExcelByUserName() - Successful.....");
            return ResponseEntity.ok(this.qualityChecksService.getExcelByUserName(name, columns));
        } catch (Exception e) {
            log.error("Error in getExcelByUserName: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
