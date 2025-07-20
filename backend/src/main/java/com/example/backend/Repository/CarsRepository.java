package com.example.backend.Repository;

import com.example.backend.Model.Class.Cars;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface CarsRepository extends JpaRepository<Cars, String> {
    @Query("""
            SELECT DISTINCT c FROM Cars c LEFT JOIN CarParts cp ON c.id = cp.car_id.id LEFT JOIN Employees e ON cp.installed_by.id = e.id
            LEFT JOIN User u ON u.employees_id.id = e.id LEFT JOIN CarModel cm ON cm.id = c.model_id.id WHERE u.username = :name
            """)
    List<Cars> findByUsername(@Param("name") final String name, Pageable pageable);

    @Query("""
            SELECT count(DISTINCT cm.id) FROM Cars  c LEFT JOIN CarParts cp ON c.id = cp.car_id.id LEFT JOIN Employees e ON cp.installed_by.id = e.id
            LEFT JOIN User u ON u.employees_id.id = e.id LEFT JOIN CarModel cm ON cm.id = c.model_id.id WHERE u.username = :name
            """)
    Long countByUsername(@Param("name") final String name);
}
