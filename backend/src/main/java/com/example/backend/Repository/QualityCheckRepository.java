package com.example.backend.Repository;

import com.example.backend.Model.Class.QualityChecks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualityCheckRepository extends JpaRepository<QualityChecks, String> {
}
