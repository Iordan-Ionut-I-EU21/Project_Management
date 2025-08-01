package com.example.backend.Model.Dto;

import com.example.backend.Configuration.LocalDateTimeStartOfDayDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class QualityChecksFilterDTO {
	public static final String QUERY = " AND (:car_id_model_id_name IS NULL OR LOWER(qc.car_id.model_id.name) LIKE  LOWER(CONCAT('%', " +
			":car_id_model_id_name, '%'))) AND (:car_id_model_id_generation IS NOT NULL OR qc" +
			".car_id.model_id.generation = :car_id_model_id_generation) AND (:car_id_model_id_release_year IS NOT " +
			"NULL OR qc.car_id.model_id.release_year = :car_id_model_id_release_year) AND (:inspector_id_name IS NOT " +
			"NULL OR LOWER(qc.inspector_id.name) LIKE LOWER(CONCAT('%',:inspector_id_name,'%'))) AND (:check_date IS " +
			"NOT NULL OR qc.check_date = :check_date) AND (:passed IS NOT NULL OR qc.passed = :passed)";
	private String car_id_model_id_name;
	private Long car_id_model_id_generation;
	private Long car_id_model_id_release_year;
	private String inspector_id_name;
	@JsonDeserialize(using = LocalDateTimeStartOfDayDeserializer.class)
	private LocalDateTime check_date;
	private Boolean passed;
}
