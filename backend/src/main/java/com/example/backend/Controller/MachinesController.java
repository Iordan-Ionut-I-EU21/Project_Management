package com.example.backend.Controller;

import com.example.backend.Model.Class.Machines;
import com.example.backend.Model.Dto.CountViewDTO;
import com.example.backend.Service.MachinesService;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/machines")
@JBossLog
public class MachinesController {
    @Autowired
    private MachinesService machinesService;

    @GetMapping("/count/dialog/by")
    public ResponseEntity<List<CountViewDTO>> countStatusByMachineId(@RequestParam("machineId") final String machineId) {
        try {
            log.info("countStatusByMachineId() - Successful.....");
            return ResponseEntity.ok(this.machinesService.countStatusByMachineId(machineId));
        } catch (Exception e) {
            log.error("Error in countStatusByMachineId: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/find/by-key")
    public ResponseEntity<Machines> findMachinesByKey(@RequestParam("key") final String key){
        try {
            log.info("findMachinesByKey() - Successful.....");
            return ResponseEntity.ok(this.machinesService.findMachinesByKey(key));
        } catch (Exception e) {
            log.error("Error in findMachinesByKey: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
