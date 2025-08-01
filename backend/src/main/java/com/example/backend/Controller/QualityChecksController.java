package com.example.backend.Controller;

import com.example.backend.Model.Dto.FindByRequestDTO;
import com.example.backend.Model.Dto.QualityChecksFiltersDTO;
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
    public ResponseEntity<GroupedResult> getDataByUserNameAndQualityChecksFilters(@RequestParam("name") final String name, @RequestBody FindByRequestDTO request) {
        try {
            log.info("getDataByUserNameAndQualityChecksFilters() - Successful.....");
            TableRequest tableRequest = request.getTableRequest();
            QualityChecksFiltersDTO qualityChecksFilterDTO = request.getQualityChecksFiltersDTO();
            return ResponseEntity.ok(new GroupedResult(this.qualityChecksService.findByUserName(name, tableRequest, qualityChecksFilterDTO), this.qualityChecksService.countByUserName(name, qualityChecksFilterDTO)));
        } catch (Exception e) {
            log.error("Error in getDataByUserNameAndQualityChecksFilters: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/count/by")
    public ResponseEntity<Long> countByUserNameAndQualityChecksFilters(@RequestParam("name") final String name, @RequestBody FindByRequestDTO request) {
        try {
            log.info("countByUserNameAndQualityChecksFilters() - Successful.....");
            return ResponseEntity.ok(this.qualityChecksService.countByUserName(name, request.getQualityChecksFiltersDTO()));
        } catch (Exception e) {
            log.error("Error in countByUserNameAndQualityChecksFilters: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/excel/find/by")
    public ResponseEntity<List<Object[]>> postExcelByUserNameAndQualityChecksFilters(@RequestParam("name") final String name, @RequestParam("columns") final String columns, @RequestBody FindByRequestDTO request) {
        try {
            log.info("postExcelByUserNameAndQualityChecksFilters() - Successful.....");
            return ResponseEntity.ok(this.qualityChecksService.getExcelByUserName(name, columns,
                    request.getQualityChecksFiltersDTO()));
        } catch (Exception e) {
            log.error("Error in postExcelByUserNameAndQualityChecksFilters: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
