package com.example.backend.Repository;

import com.example.backend.Model.Class.PartProduction;
import com.example.backend.Model.Dto.PartProductionFiltersDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PartProductionRepository extends JpaRepository<PartProduction, String> {
	@Query("SELECT pp " + PartProduction.QUERY + PartProductionFiltersDTO.QUERY)
	List<PartProduction> findByMachineNameOrIdAndPartProductionFilter(@Param("machine_name_or_id") final String machine_name_or_id, Pageable pageable, @Param("part_id_name") final String part_id_name, @Param("part_id_category") final String part_id_category, @Param("produced_date") final LocalDate produced_date, @Param("quantity") final Long quantity, @Param("part_id_unit_cost") final Long part_id_unit_cost);

	@Query("SELECT COUNT(pp) " + PartProduction.QUERY + PartProductionFiltersDTO.QUERY)
	Long countByMachineNameOrIdAndPartProductionFilter(@Param("machine_name_or_id") final String machine_name_or_id, @Param("part_id_name") final String part_id_name, @Param("part_id_category") final String part_id_category, @Param("produced_date") final LocalDate produced_date, @Param("quantity") final Long quantity, @Param("part_id_unit_cost") final Long part_id_unit_cost);
}
