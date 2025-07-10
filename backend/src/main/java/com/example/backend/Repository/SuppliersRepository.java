package com.example.backend.Repository;

import com.example.backend.Model.Class.Suppliers;
import com.example.backend.Model.Class.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SuppliersRepository  extends JpaRepository<Suppliers, String> {
    @Query("SELECT s FROM Suppliers s WHERE s.name = :name")
    Optional<Suppliers> findByName(@Param("name") final String name);
}
