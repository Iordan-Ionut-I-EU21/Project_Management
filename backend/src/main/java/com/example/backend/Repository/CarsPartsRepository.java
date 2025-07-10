package com.example.backend.Repository;

import com.example.backend.Model.Class.CarParts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarsPartsRepository extends JpaRepository<CarParts, String> {
}
