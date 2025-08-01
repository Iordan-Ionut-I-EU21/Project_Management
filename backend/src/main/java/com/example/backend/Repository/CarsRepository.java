package com.example.backend.Repository;

import com.example.backend.Model.Class.Cars;
import com.example.backend.Model.Dto.CarsFiltersDTO;
import com.example.backend.Model.View.CountView;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarsRepository extends JpaRepository<Cars, String> {
    @Query("SELECT c " + Cars.QUERY + "  u.username = :username " + CarsFiltersDTO.QUERY)
    List<Cars> findByUsernameAndCarsFilters(@Param("username") final String username, Pageable pageable, @Param("model_id_name") final String model_id_name, @Param("model_id_generation") final Long model_id_generation, @Param("model_id_release_year") final Long model_id_release_year, @Param("vin") final String vin, @Param("status") final String status);

    @Query("SELECT count(DISTINCT cm.id) " + Cars.QUERY + " u.username = :username " + CarsFiltersDTO.QUERY)
    Long countByUsernameAndCarsFilters(@Param("username") final String username, @Param("model_id_name") final String model_id_name, @Param("model_id_generation") final Long model_id_generation, @Param("model_id_release_year") final Long model_id_release_year, @Param("vin") final String vin, @Param("status") final String status);

    @Query("SELECT c.status AS status, COUNT(c.id) AS count FROM Cars c LEFT JOIN CarModel cm ON c.model_id.id = cm.id WHERE cm.id = :carModelId GROUP by c.status")
    List<CountView> countStatusByCarModelId(@Param("carModelId") String carModelId);
}
