package com.example.backend.Model.Dto;

import com.example.backend.Configuration.LocalDateTimeStartOfDayDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Component("qualityChecksCacheKeyHelper")
public class QualityChecksFiltersDTO {
	public static final String QUERY =
			" AND (:car_id_model_id_name IS NULL OR LOWER(qc.car_id.model_id.name) LIKE " + "LOWER(CONCAT('%', " +
					":car_id_model_id_name,'%'))) AND (:car_id_model_id_generation IS NULL OR qc" + ".car_id.model_id" +
					".generation = :car_id_model_id_generation) AND (:car_id_model_id_release_year IS " + "NULL OR qc" +
					".car_id.model_id.release_year = :car_id_model_id_release_year) AND (:inspector_id_name IS " +
					"NULL OR LOWER(qc.inspector_id.name) LIKE LOWER(CONCAT('%',:inspector_id_name,'%'))) AND " +
					"(:check_date IS " + "NULL OR qc.check_date = :check_date) AND (:passed IS NULL OR qc.passed = " +
					":passed) AND (:car_id_status IS NULL OR LOWER(qc.car_id.status) LIKE LOWER(CONCAT" +
					"('%',:car_id_status,'%')))";
	private String car_id_model_id_name;
	private Long car_id_model_id_generation;
	private Long car_id_model_id_release_year;
	private String inspector_id_name;
	@JsonDeserialize(using = LocalDateTimeStartOfDayDeserializer.class)
	private LocalDateTime check_date;
	private Boolean passed;
	private String car_id_status;

	public String buildQualityChecksKey(QualityChecksFiltersDTO filters) {
		return +'_' + safe(filters.getCar_id_model_id_name()) + "_" + safe(filters.getCar_id_model_id_generation()) + "_" + safe(filters.getCar_id_model_id_release_year()) + "_" + safe(filters.getInspector_id_name()) + "_" + safe(filters.getCheck_date()) + "_" + safe(filters.getPassed()) + "_" + safe(filters.getCar_id_status());
	}

	private String safe(Object o) {
		return o == null ? "" : o.toString();
	}
}
