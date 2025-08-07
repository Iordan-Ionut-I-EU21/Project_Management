package com.example.backend.Model.Dto;

import com.example.backend.Configuration.LocalDateTimeStartOfDayDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component("partProductionCacheKeyHelper")
public class PartProductionFiltersDTO {
	public static final String QUERY =
			" AND (:part_id_name IS NULL OR LOWER(pp.part_id.name) LIKE LOWER(CONCAT('%'," + ":part_id_name, '%'))) " +
					"AND (:part_id_category IS NULL OR LOWER(pp.part_id.category) LIKE LOWER(CONCAT" + "('%'," +
					":part_id_category,'%'))) AND (:produced_date IS NULL OR DATE(pp.produced_date) = :produced_date)" +
					" AND " + "(:quantity IS NULL OR pp.quantity = :quantity) AND (:part_id_unit_cost IS NULL OR pp.part_id.unit_cost =" + " :part_id_unit_cost)";
	private String part_id_name;
	private String part_id_category;
//	@JsonDeserialize(using = LocalDateTimeStartOfDayDeserializer.class)
	private LocalDate produced_date;
	private Long quantity;
	private Long part_id_unit_cost;

	public String buildPartProductionKey(PartProductionFiltersDTO filters) {
		return +'_' + safe(filters.getPart_id_name()) + "_" + safe(filters.getPart_id_category()) + "_" + safe(filters.getProduced_date()) + "_" + safe(filters.getQuantity()) + "_" + safe(filters.getPart_id_unit_cost());
	}

	private String safe(Object o) {
		return o == null ? "" : o.toString();
	}
}
