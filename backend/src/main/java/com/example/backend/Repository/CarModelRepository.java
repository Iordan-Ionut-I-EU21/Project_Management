package com.example.backend.Repository;

import com.example.backend.Model.Class.CarModel;
import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CarModelRepository extends JpaRepository<CarModel, String> {
    @Query("SELECT c FROM CarModel c WHERE c.name = :name")
    CarModel findByName(@Param("name") final String name);
}
