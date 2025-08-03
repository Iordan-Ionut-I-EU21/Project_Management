package com.example.backend.Controller;

import com.example.backend.Model.Dto.FindByRequestDTO;
import com.example.backend.Model.Dto.ProcessLogsFilterDTO;
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
@RequestMapping("/api/process/log")
@JBossLog
public class ProcessLogController {
    @Autowired
    private ProcessLogService processLogService;

	@PostMapping("/find/by-process-log")
	public ResponseEntity<GroupedResult> getDataByUserNameAndProcessLogFilters(@RequestParam("name") final String name, @RequestBody FindByRequestDTO request) {
        try {
			log.info("getDataByUserNameAndProcessLogFilters() - Successful.....");
			TableRequest tableRequest = request.getTableRequest();
			ProcessLogsFilterDTO processLogsFilterDTO = request.getProcessLogsFilterDTO();
			return ResponseEntity.ok(new GroupedResult(this.processLogService.findByUserNameAndProcessLogFilters(name, tableRequest, processLogsFilterDTO), this.processLogService.countByUserNameAndProcessLogFilters(name, processLogsFilterDTO)));
        } catch (Exception e) {
			log.error("Error in getDataByUserNameAndProcessLogFilters: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

	@GetMapping("/count/by-process-log")
	public ResponseEntity<Long> countByUserNameAndProcessLogFilters(@RequestParam("name") final String name, @RequestBody FindByRequestDTO request) {
        try {
			log.info("countByUserNameAndProcessLogFilters() - Successful.....");
			ProcessLogsFilterDTO processLogsFilterDTO = request.getProcessLogsFilterDTO();
			return ResponseEntity.ok(this.processLogService.countByUserNameAndProcessLogFilters(name, processLogsFilterDTO));
        } catch (Exception e) {
			log.error("Error in countByUserNameAndProcessLogFilters: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

	@PostMapping("/excel/find/by-process-log")
	public ResponseEntity<List<Object[]>> postExcelByUserNameAndProcessLogFilters(@RequestParam("name") final String name, @RequestParam("columns") final String columns, @RequestBody FindByRequestDTO request) {
        try {
			log.info("postExcelByUserNameAndProcessLogFilters() - Successful.....");
			ProcessLogsFilterDTO processLogsFilterDTO = request.getProcessLogsFilterDTO();
			return ResponseEntity.ok(this.processLogService.postExcelByUserNameAndProcessLogFilters(name, columns, processLogsFilterDTO));
        } catch (Exception e) {
			log.error("Error in postExcelByUserNameAndProcessLogFilters: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

	@PostMapping("/find/by-machine-used")
	public ResponseEntity<GroupedResult> postDataByUsernameAndMachineUsedFilters(@RequestParam("username") final String userName, @RequestBody FindByRequestDTO response) {
		try {
			log.info("postDataByUsernameAndMachineUsedFilters() - Successful.....");
			return ResponseEntity.ok(new GroupedResult(this.processLogService.findByUsernameAndMachineUsedFilters(userName, response.getTableRequest(), response.getMachineUsedFiltersDTO()), this.processLogService.countByUsernameAndMachineUsedFilters(userName, response.getMachineUsedFiltersDTO())));
		} catch (Exception e) {
			log.error("Error in postDataByUsernameAndMachineUsedFilters: {}", e.getMessage(), e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/excel/find/by-machine-used")
	public ResponseEntity<List<Object[]>> postExcelByUserNameAndMachineUsedFilters(@RequestParam("name") final String name, @RequestParam("columns") final String columns, @RequestBody FindByRequestDTO request) {
		try {
			log.info("postExcelByUserNameAndMachineUsedFilters() - Successful.....");
			return ResponseEntity.ok(this.processLogService.postExcelByUserNameAndMachineUsedFilters(name, columns, request.getMachineUsedFiltersDTO()));
		} catch (Exception e) {
			log.error("Error in postExcelByUserNameAndMachineUsedFilters: {}", e.getMessage(), e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
