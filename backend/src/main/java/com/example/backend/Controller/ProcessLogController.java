package com.example.backend.Controller;

import com.example.backend.Model.Enum.ProcessLogStatus;
import com.example.backend.Service.ProcessLogService;
import com.example.backend.Utility.GroupedResult;
import com.example.backend.Utility.TableRequest;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/api/process/log/")
@JBossLog
public class ProcessLogController {
    @Autowired
    private ProcessLogService processLogService;

    @PostMapping("find/by")
    public ResponseEntity<GroupedResult> getDataByUserNameAndStatus(@RequestParam("name") final String name, @RequestParam(name = "status", required = false) final ProcessLogStatus status, @RequestBody TableRequest tableRequest) {
        try {
            log.info("getDataByUserNameAndStatus() - Successful.....");
            return ResponseEntity.ok(new GroupedResult(this.processLogService.findByUserNameAndStatus(name, status, tableRequest), this.processLogService.countByUserNameAndStatus(name, status)));
        } catch (Exception e) {
            log.error("Error in getDataByUserNameAndStatus: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/count/by")
    public ResponseEntity<Long> countByUserNameAndStatus(@RequestParam("name") final String name, @RequestParam(name = "status", required = false) final ProcessLogStatus status) {
        try {
            log.info("countByUserNameAndStatus() - Successful.....");
            return ResponseEntity.ok(this.processLogService.countByUserNameAndStatus(name, status));
        } catch (Exception e) {
            log.error("Error in countByUserNameAndStatus: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/excel/find/by")
    public ResponseEntity<List<Object[]>> getExcelByUserNameAndStatus(@RequestParam("name") final String name, @RequestParam(name = "status", required = false) final ProcessLogStatus status, @RequestParam("columns") final String columns) {
        try {
            log.info("getExcelByUserNameAndStatus() - Successful.....");
            return ResponseEntity.ok(this.processLogService.getExcelByUserNameAndStatus(name, status, columns));
        } catch (Exception e) {
            log.error("Error in getExcelByUserNameAndStatus: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
