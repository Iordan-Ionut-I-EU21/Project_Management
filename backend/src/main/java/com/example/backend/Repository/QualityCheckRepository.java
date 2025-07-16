package com.example.backend.Repository;

import com.example.backend.Model.Class.QualityChecks;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QualityCheckRepository extends JpaRepository<QualityChecks, String> {
    @Query("SELECT qc FROM QualityChecks qc LEFT JOIN User u on u.employees_id.id = qc.inspector_id.id WHERE u.username = :name")
    List<QualityChecks> findByUserName(@Param("name") final String name, Pageable pageable);

    @Query("SELECT count(qc.id) FROM QualityChecks qc LEFT JOIN User u on u.employees_id.id = qc.inspector_id.id WHERE u.username = :name")
    Long countByUserName(@Param("name") final String name);
}
