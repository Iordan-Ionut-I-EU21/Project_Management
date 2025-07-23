package com.example.backend.Repository;

import com.example.backend.Model.Class.CarParts;
import com.example.backend.Model.Class.Parts;
import com.example.backend.Service.CarsPartsService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarsPartsRepository extends JpaRepository<CarParts, String> {
    @Query("SELECT cp FROM CarParts cp LEFT JOIN Employees e ON e.id = cp.installed_by.id LEFT JOIN User u ON u.employees_id.id = e.id WHERE u.username = :username")
    List<CarParts> findByUserName(@Param("username") final String username, Pageable pageable);

    @Query("SELECT COUNT(cp.id) FROM CarParts cp LEFT JOIN Employees e ON e.id = cp.installed_by.id LEFT JOIN User u ON u.employees_id.id = e.id WHERE u.username = :username")
    Long countByUserName(@Param("username") final String username);
}
