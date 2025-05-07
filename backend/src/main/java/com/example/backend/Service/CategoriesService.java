package com.example.backend.Service;

import com.example.backend.Model.Class.Categories;
import com.example.backend.Repository.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriesService {
    @Autowired
    private CategoriesRepository categoriesRepository;

    public List<Categories> getAllCategories() {
        return this.categoriesRepository.findAll();
    }

    public void postCategories(List<Categories> categories) {
        this.categoriesRepository.saveAll(categories);
    }
}
