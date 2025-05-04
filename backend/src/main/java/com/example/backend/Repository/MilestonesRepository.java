package com.example.backend.Repository;


import com.example.backend.Model.Class.Milestones;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MilestonesRepository extends JpaRepository<Milestones, String> {
}
