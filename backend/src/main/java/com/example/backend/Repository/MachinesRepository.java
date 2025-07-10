package com.example.backend.Repository;

import com.example.backend.Model.Class.Machines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MachinesRepository extends JpaRepository<Machines, String> {
}
