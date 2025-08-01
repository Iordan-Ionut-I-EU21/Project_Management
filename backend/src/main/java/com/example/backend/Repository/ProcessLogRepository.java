package com.example.backend.Repository;

import com.example.backend.Model.Class.ProcessLog;
import com.example.backend.Model.Dto.ProcessLogsFilterDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@Repository
public interface ProcessLogRepository extends JpaRepository<ProcessLog, String> {
    @Query("SELECT p "+ProcessLog.QUERY+" u.username = :username " + ProcessLogsFilterDTO.QUERY)
    List<ProcessLog> findByUserNameAndProcessLogFilters(@Param("username") final String username, Pageable pageable, @Param("status") final String status, @Param("process_id_name") final String process_id_name, @Param("machine_id_name") final String machine_id_name, @Param("start_date") final LocalDateTime start_date, @Param("end_date") LocalDateTime end_date);

    @Query("SELECT count(p.id) " + ProcessLog.QUERY + " u.username = :username " + ProcessLogsFilterDTO.QUERY)
    Long countByUserNameAndProcessLogFilters(@Param("username") final String username, @Param("status") final String status, @Param("process_id_name") final String process_id_name, @Param("machine_id_name") final String machine_id_name, @Param("start_date") final LocalDateTime start_date, @Param("end_date") LocalDateTime end_date);
}