package com.example.backend.Controller;

import com.example.backend.Model.Class.CarModel;
import com.example.backend.Model.Class.User;
import com.example.backend.Service.CarModelService;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/car/model")
@JBossLog
public class CarModelController {
    @Autowired
    private CarModelService carModelService;

    @GetMapping("/find-search/by")
    public ResponseEntity<List<CarModel>> findByName(@RequestParam("name") final String name){
        try {
            log.info("findByName() - Successful.....");
            return ResponseEntity.ok(this.carModelService.findByName(name));
        } catch (Exception e) {
            log.error("Error in findByName: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
