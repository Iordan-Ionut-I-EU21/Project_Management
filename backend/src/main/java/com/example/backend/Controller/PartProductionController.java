package com.example.backend.Controller;

import com.example.backend.Model.Dto.FindByRequestDTO;
import com.example.backend.Service.PartProductionService;
import com.example.backend.Utility.GroupedResult;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/part/production")
@JBossLog
public class PartProductionController {
    @Autowired
    private PartProductionService partProductionService;

	@PostMapping("/find/by")
	public ResponseEntity<GroupedResult> findByMachineNameOrIdAndPartProductionFilter(@RequestParam("machine_name_or_id") final String machine_name_or_id, @RequestBody FindByRequestDTO request) {
		try {
			log.info("findByMachineNameOrIdAndPartProductionFilter() - Successful.....");
			return ResponseEntity.ok(new GroupedResult(this.partProductionService.findByMachineNameOrIdAndPartProductionFilter(machine_name_or_id, request.getTableRequest(), request.getPartProductionFiltersDTO()), this.partProductionService.countByMachineNameOrIdAndPartProductionFilter(machine_name_or_id, request.getPartProductionFiltersDTO())));
		} catch (Exception e) {
			log.error("Error in findByMachineNameOrIdAndPartProductionFilter: {}", e.getMessage(), e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/count/by")
	public ResponseEntity<Long> countByMachineNameOrIdAndPartProductionFilter(@RequestParam("machine_name_or_id") final String machine_name_or_id, @RequestBody FindByRequestDTO request) {
		try {
			log.info("countByMachineNameAndPartProductionFilter() - Successful.....");
			return ResponseEntity.ok(this.partProductionService.countByMachineNameOrIdAndPartProductionFilter(machine_name_or_id, request.getPartProductionFiltersDTO()));
		} catch (Exception e) {
			log.error("Error in countByMachineNameOrIdAndPartProductionFilter: {}", e.getMessage(), e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/excel/find/by")
	public ResponseEntity<List<Object[]>> excelDataByMachineNameOrIdAndPartProductionFilters(@RequestParam("machine_name_or_id") final String machine_name_or_id, @RequestParam("columns") final String columns, @RequestBody FindByRequestDTO request) {
		try {
			log.info("excelDataByMachineNameOrIdAndPartProductionFilters() - Successful.....");
			return ResponseEntity.ok(this.partProductionService.excelDataByMachineNameOrIdAndPartProductionFilters(machine_name_or_id, columns, request.getPartProductionFiltersDTO()));
		} catch (Exception e) {
			log.error("Error in excelDataByMachineNameOrIdAndPartProductionFilters: {}", e.getMessage(), e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
