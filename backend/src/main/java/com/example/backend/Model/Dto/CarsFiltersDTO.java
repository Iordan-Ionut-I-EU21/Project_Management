package com.example.backend.Model.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Component("carsCacheKeyHelper")
public class CarsFiltersDTO {
	public static final String QUERY = " AND (:model_id_release_year IS NULL OR c.model_id.release_year = :model_id_release_year) AND " + " (:status IS NULL OR LOWER(c.status) LIKE  LOWER(CONCAT('%', :status, '%'))) AND " + " (:vin IS NULL OR LOWER(c.vin) LIKE  LOWER(CONCAT('%', :vin, '%'))) AND" + " (:model_id_generation IS NULL OR c.model_id.generation = :model_id_generation) AND" + " (:model_id_name IS NULL OR LOWER(c.model_id.name) LIKE LOWER(CONCAT('%',:model_id_name,'%'))) ";
	private Long model_id_release_year;
	private String status;
	private String vin;
	private Long model_id_generation;
	private String model_id_name;

	public String buildCarsKey(CarsFiltersDTO filters) {
		return +'_' + safe(filters.getModel_id_generation()) + "_" + safe(filters.getStatus()) + "_" + safe(filters.getVin()) + "_" + safe(filters.getModel_id_generation()) + "_" + safe(filters.getModel_id_name());
	}

	private String safe(Object o) {
		return o == null ? "" : o.toString();
	}
}
