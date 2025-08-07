package com.example.backend.Controller;

import com.example.backend.Model.Class.Machines;
import com.example.backend.Model.Dto.CountViewDTO;
import com.example.backend.Model.Enum.MachineStatus;
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

    @GetMapping("/find/by")
    public ResponseEntity<Machines> findMachinesByNameOrId(@RequestParam("machine_name_or_id") final String machine_name_or_id){
        try {
            log.info("findMachinesByNameOrId() - Successful.....");
            return ResponseEntity.ok(this.machinesService.findMachinesByNameOrId(machine_name_or_id));
        } catch (Exception e) {
            log.error("Error in findMachinesByNameOrId: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/can-access")
    public ResponseEntity<Boolean> canAccessPage(@RequestParam("machine_name_or_id") final String machine_name_or_id,
                                                 @RequestParam("username") final String username){
        try {
            log.info("canAccessPage() - Successful.....");
            return ResponseEntity.ok(this.machinesService.canAccessPage(machine_name_or_id, username));
        } catch (Exception e) {
            log.error("Error in canAccessPage: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/put/status")
    public ResponseEntity<Integer> updateMachineStatus(@RequestParam("machine_name_or_id") final String machine_name_or_id, @RequestParam("status") final MachineStatus status){
        try {
            log.info("updateMachineStatus() - Successful.....");
            return ResponseEntity.ok(this.machinesService.updateMachineStatus(machine_name_or_id, status));
        } catch (Exception e) {
            log.error("Error in updateMachineStatus: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
