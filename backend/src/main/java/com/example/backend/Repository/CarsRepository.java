package com.example.backend.Repository;

import com.example.backend.Model.Class.Cars;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarsRepository extends JpaRepository<Cars, String> {
}
