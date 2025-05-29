package com.example.backend.Controller;

import com.example.backend.Model.Class.Categories;
import com.example.backend.Model.Class.Projects;
import com.example.backend.Service.CategoriesService;
import lombok.extern.jbosslog.JBossLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/categories")
@JBossLog
public class CategoriesController {
    @Autowired
    private CategoriesService categoriesService;

    @GetMapping("/get/all")
    public ResponseEntity<List<Categories>> getAllProjects() {
        try {
            log.info("getAllProjects() - Successful.");
            return ResponseEntity.ok(this.categoriesService.getAllCategories());
        } catch (Exception e) {
            log.error("Failed to retrieve getAllProjects(): {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
