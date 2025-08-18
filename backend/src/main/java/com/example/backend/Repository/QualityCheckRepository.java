package com.example.backend.Repository;

import com.example.backend.Model.Class.QualityChecks;
import com.example.backend.Model.Dto.QualityChecksFiltersDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QualityCheckRepository extends JpaRepository<QualityChecks, String> {
    @Query("SELECT qc " + QualityChecks.QUERY + " u.username = :username " + QualityChecksFiltersDTO.QUERY)
    List<QualityChecks> findByUserName(@Param("username") final String username, Pageable pageable, @Param("car_id_model_id_name") final String car_id_model_id_name, @Param("car_id_model_id_generation") final Long car_id_model_id_generation, @Param("car_id_model_id_release_year") final Long car_id_model_id_release_year, @Param("inspector_id_name") final String inspector_id_name, @Param("check_date") final LocalDateTime check_date, @Param("passed") final Boolean passed, @Param("car_id_status") final String car_id_status);

    @Query("SELECT count(qc.id) " + QualityChecks.QUERY + " u.username = :username " + QualityChecksFiltersDTO.QUERY)
    Long countByUserName(@Param("username") final String username, @Param("car_id_model_id_name") final String car_id_model_id_name, @Param("car_id_model_id_generation") final Long car_id_model_id_generation, @Param("car_id_model_id_release_year") final Long car_id_model_id_release_year, @Param("inspector_id_name") final String inspector_id_name, @Param("check_date") final LocalDateTime check_date, @Param("passed") final Boolean passed, @Param("car_id_status") final String car_id_status);

    @Query("SELECT COUNT(qc.id) FROM QualityChecks qc WHERE LOWER(qc.id) = LOWER(:quality_id) AND qc.inspector_id.user_id.username = :username")
    Integer canAccessPageQualityChecks(@Param("quality_id") final String quality_id, @Param("username") final String username);

    @Query("SELECT COUNT(qc.id) from QualityChecks qc LEFT JOIN ProcessLog pl on qc.car_id.id = pl.car_id.id WHERE LOWER(qc.id) = LOWER(:quality_id) AND LOWER(pl.employee_id.user_id.username) = LOWER(:username)")
    Integer canAccessPageProcessLog(@Param("quality_id") final String quality_id, @Param("username") final String username);

    @Query("SELECT qc FROM QualityChecks qc WHERE LOWER(qc.id) = LOWER(:quality_id)")
    QualityChecks findQualityChecksById(@Param("quality_id") final String quality_id);
}
