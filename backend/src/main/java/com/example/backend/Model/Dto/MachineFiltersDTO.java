package com.example.backend.Model.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component("machineCacheKeyHelper")
public class MachineFiltersDTO {
	public static final String QUERY = " AND (:employee_id_user_id_username IS NULL OR LOWER(p.employee_id.user_id.username) LIKE LOWER(CONCAT('%',:employee_id_user_id_username,'%'))) AND" + " (:employee_id_user_id_role IS NULL OR LOWER(p.employee_id.user_id.role) LIKE LOWER(CONCAT('%', :employee_id_user_id_role,'%'))) AND " + " (:process_id_name IS NULL OR LOWER(p.process_id.name) LIKE LOWER(CONCAT('%',:process_id_name,'%'))) AND " + " (:employee_id_department IS NULL OR LOWER(p.employee_id.department) LIKE LOWER(CONCAT('%',:employee_id_department,'%'))) AND " + " (:start_time IS NULL OR DATE(p.start_time) = :start_time) AND (:end_time IS NULL OR DATE(p.end_time) = :end_time) AND " + " (:status IS NULL OR LOWER(p.status) LIKE LOWER(CONCAT('%',:status,'%')))";
	private String employee_id_user_id_username;
	private String employee_id_user_id_role;
	private String process_id_name;
	private String employee_id_department;
	private LocalDate start_time;
	private LocalDate end_time;
	private String status;

	public String buildMachineKey(MachineFiltersDTO filters) {
		return "_" + safe(filters.getEmployee_id_user_id_username()) + "_" + safe(filters.getEmployee_id_user_id_role()) + "_" + safe(filters.getProcess_id_name()) + "_" + safe(filters.getEmployee_id_department()) + "_" + safe(filters.getStart_time()) + "_" + safe(filters.getEnd_time()) + "_" + safe(filters.getStatus());
	}

	private String safe(Object o) {
		return o == null ? "" : o.toString();
	}
}
