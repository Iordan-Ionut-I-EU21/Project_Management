package com.example.backend.Controller;

import com.example.backend.Service.PartSuppliersService;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/part/suppliers")
@JBossLog
public class PartSuppliersController {
    @Autowired
    private PartSuppliersService partSuppliersService;
}
