package com.example.backend.Controller;

import com.example.backend.Service.SuppliersService;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/suppliers")
@JBossLog
public class SuppliersController {
    @Autowired
    private SuppliersService suppliersService;
}
