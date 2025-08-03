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
@Component("machineUsedCacheKeyHelper")
public class MachineUsedFiltersDTO {
	public static final String QUERY = " AND (:machine_id_name IS NULL OR LOWER(pl.machine_id.name) LIKE  LOWER(CONCAT('%', :machine_id_name, '%'))) " +
			"AND (:machine_id_status IS NULL OR LOWER(pl.machine_id.status) LIKE LOWER(CONCAT('%',:machine_id_status,'%'))) AND " +
			"(:car_id_model_id_name IS NULL OR LOWER(pl.car_id.model_id.name) LIKE LOWER(CONCAT('%',:car_id_model_id_name,'%'))) AND " +
			"(:status IS NULL OR LOWER(pl.status) LIKE LOWER(CONCAT('%',:status,'%'))) AND " +
			"(:process_id_name IS NULL OR LOWER(pl.process_id.name) LIKE LOWER(CONCAT('%',:process_id_name,'%'))) AND " +
			"(:employee_id_user_id_username IS NULL OR LOWER(pl.employee_id.user_id.username) LIKE LOWER(CONCAT('%',:employee_id_user_id_username,'%')))";
	private String machine_id_name;
	private String machine_id_status;
	private String car_id_model_id_name;
	private String status;
	private String process_id_name;
	private String employee_id_user_id_username;

	public String buildMachineUsedKey(MachineUsedFiltersDTO filters) {
		return +'_' + safe(filters.getMachine_id_name()) + "_" + safe(filters.getMachine_id_status()) + "_" + safe(filters.getCar_id_model_id_name()) + "_" + safe(filters.getStatus()) + "_" + safe(filters.getProcess_id_name()) + "_" + safe(filters.getEmployee_id_user_id_username());
	}

	private String safe(Object o) {
		return o == null ? "" : o.toString();
	}
}
