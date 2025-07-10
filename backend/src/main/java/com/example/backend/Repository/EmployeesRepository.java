package com.example.backend.Repository;

import com.example.backend.Model.Class.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeesRepository extends JpaRepository<Employees, String> {
    @Query("SELECT e FROM Employees e where e.name = :name")
    Optional<Employees> findByName(@Param("name") final String name);
}
