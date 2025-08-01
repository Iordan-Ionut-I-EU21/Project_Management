package com.example.backend.Model.Dto;

import com.example.backend.Model.Enum.PartCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component("carsPartsCacheKeyHelper")
public class CarsPartsFiltersDTO {
	public static final String QUERY = " AND (:part_id_unit_cost IS NULL OR cp.part_id.unit_cost = :part_id_unit_cost) AND " + " (:quantity IS NULL OR cp.quantity = :quantity) AND " + " (:installed_by_name IS NULL OR LOWER(cp.installed_by.name) LIKE  LOWER(CONCAT('%', :installed_by_name, '%'))) AND" + " (:part_id_category IS NULL OR LOWER(cp.part_id.category) LIKE LOWER(CONCAT('%',:part_id_category,'%'))) AND" + " (:part_id_name IS NULL OR LOWER(cp.part_id.name) LIKE LOWER(CONCAT('%',:part_id_name,'%'))) AND " + " (:car_id_model_id_name IS NULL OR LOWER(cp.car_id.model_id.name) LIKE LOWER(CONCAT('%',:car_id_model_id_name,'%'))) ";
	private Long part_id_unit_cost;
	private Long quantity;
	private String installed_by_name;
	private String part_id_category;
	private String part_id_name;
	private String car_id_model_id_name;

	public String buildCarsPartsKey(CarsPartsFiltersDTO filters) {
		return +'_' + safe(filters.getPart_id_unit_cost()) + "_" + safe(filters.getCar_id_model_id_name()) + "_" + safe(filters.getInstalled_by_name()) + "_" + safe(filters.getPart_id_category()) + "_" + safe(filters.getPart_id_name()) + "_" + safe(filters.getQuantity());
	}

	private String safe(Object o) {
		return o == null ? "" : o.toString();
	}
}
