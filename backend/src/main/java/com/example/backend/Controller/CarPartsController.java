package com.example.backend.Controller;

import com.example.backend.Model.Dto.FindByRequestDTO;
import com.example.backend.Service.CarsPartsService;
import com.example.backend.Utility.GroupedResult;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/car/parts")
@JBossLog
public class CarPartsController {
    @Autowired
    private CarsPartsService carsPartsService;

    @PostMapping("/find/by")
    public ResponseEntity<GroupedResult> postDataByUserNameAndCarsPartsFilters(@RequestParam("name") final String name, @RequestBody FindByRequestDTO request) {
        try {
            log.info("postDataByUserNameAndCarsPartsFilters() - Successful.....");
            return ResponseEntity.ok(new GroupedResult(this.carsPartsService.findByUserNameAndCarsPartsFilters(name, request.getTableRequest(), request.getCarsPartsFiltersDTO()), this.carsPartsService.countByUserNameAndCarsPartsFilters(name, request.getCarsPartsFiltersDTO())));
        } catch (Exception e) {
            log.error("Error in postDataByUserNameAndCarsPartsFilters: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/count/by")
    public ResponseEntity<Long> countByUsernameAndCarsPartsFilters(@RequestParam("name") final String name, @RequestBody FindByRequestDTO request) {
        try {
            log.info("countByUsernameAndCarsPartsFilters() - Successful.....");
            return ResponseEntity.ok(this.carsPartsService.countByUserNameAndCarsPartsFilters(name, request.getCarsPartsFiltersDTO()));
        } catch (Exception e) {
            log.error("Error in countByUsernameAndCarsPartsFilters: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/excel/find/by")
    public ResponseEntity<List<Object[]>> getExcelByUserNameAndCarsPartsFilters(@RequestParam("name") final String name, @RequestParam("columns") final String columns, @RequestBody FindByRequestDTO request) {
        try {
            log.info("getExcelByUserNameAndCarsPartsFilters() - Successful.....");
            return ResponseEntity.ok(this.carsPartsService.getExcelByUserNameAndCarsPartsFilters(name, columns, request.getCarsPartsFiltersDTO()));
        } catch (Exception e) {
            log.error("Error in getExcelByUserNameAndCarsPartsFilters: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
