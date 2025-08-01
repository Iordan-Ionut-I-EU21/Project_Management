package com.example.backend.Model.Dto;

import com.example.backend.Configuration.LocalDateTimeStartOfDayDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component("processLogsCacheKeyHelper")
public class ProcessLogsFilterDTO {
	public static final String QUERY = " AND (:status IS NULL OR LOWER(p.status) LIKE LOWER(CONCAT('%', :status, '%'))) AND " + " (:process_id_name IS NULL OR LOWER(p.process_id.name) LIKE  LOWER(CONCAT('%', :process_id_name, '%'))) AND " + " (:machine_id_name IS NULL OR LOWER(p.machine_id.name) LIKE  LOWER(CONCAT('%', :machine_id_name, '%'))) AND" + " (:start_date IS NULL OR p.start_time >= :start_date) AND" + " (:end_date IS NULL OR p.end_time <= :end_date) ";
	private String status;
	private String process_id_name;
	private String machine_id_name;
	@JsonDeserialize(using = LocalDateTimeStartOfDayDeserializer.class)
	private LocalDateTime start_date;
	@JsonDeserialize(using = LocalDateTimeStartOfDayDeserializer.class)
	private LocalDateTime end_date;

	public String buildProcessLogKey(ProcessLogsFilterDTO filters) {
		return +'_' + safe(filters.getStatus()) + "_" + safe(filters.getProcess_id_name()) + "_" + safe(filters.getMachine_id_name()) + "_" + safe(filters.getStart_date()) + "_" + safe(filters.getEnd_date());
	}

	private String safe(Object o) {
		return o == null ? "" : o.toString();
	}
}
