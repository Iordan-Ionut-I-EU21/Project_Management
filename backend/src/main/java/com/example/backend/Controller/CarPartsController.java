package com.example.backend.Controller;

import com.example.backend.Service.CarsPartsService;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/car/parts")
@JBossLog
public class CarPartsController {
    @Autowired
    private CarsPartsService carsPartsService;
}
