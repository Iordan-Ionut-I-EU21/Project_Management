package com.example.backend.Repository;

import com.example.backend.Model.Class.CarParts;
import com.example.backend.Model.Dto.CarsPartsFiltersDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarsPartsRepository extends JpaRepository<CarParts, String> {
    @Query("SELECT cp " + CarParts.QUERY + " u.username = :username " + CarsPartsFiltersDTO.QUERY)
    List<CarParts> findByUserNameAndCarsPartsFilters(@Param("username") final String username, Pageable pageable, @Param("part_id_unit_cost") final Long part_id_unit_cost, @Param("quantity") final Long quantity, @Param("installed_by_name") final String installed_by_name, @Param("part_id_category") final String part_id_category, @Param("part_id_name") final String part_id_name, @Param("car_id_model_id_name") final String car_id_model_id_name);

    @Query("SELECT COUNT(cp.id) " + CarParts.QUERY + " u.username = :username " + CarsPartsFiltersDTO.QUERY)
    Long countByUserNameAndCarsPartsFilters(@Param("username") final String username, @Param("part_id_unit_cost") final Long part_id_unit_cost, @Param("quantity") final Long quantity, @Param("installed_by_name") final String installed_by_name, @Param("part_id_category") final String part_id_category, @Param("part_id_name") final String part_id_name, @Param("car_id_model_id_name") final String car_id_model_id_nameF);
}
