package com.example.backend.Repository;

import com.example.backend.Model.Class.Machines;
import com.example.backend.Model.View.CountView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MachinesRepository extends JpaRepository<Machines, String> {
    @Query("""
            SELECT pl.status AS status, COUNT(pl) AS count
            FROM ProcessLog  pl JOIN Cars c ON pl.car_id.id = c.id
            JOIN CarModel c_model ON c.model_id.id = c_model.id
            JOIN Machines m ON pl.machine_id.id = m.id
            WHERE m.id = :machineId
            GROUP BY pl.status
            """)
    List<CountView> countStatusByMachineId(@Param("machineId") String machineId);

}
