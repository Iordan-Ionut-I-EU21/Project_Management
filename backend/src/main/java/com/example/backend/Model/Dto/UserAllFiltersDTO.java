package com.example.backend.Model.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Component("usersAllCacheKeyHelper")
public class UserAllFiltersDTO {
    public static final String QUERY = "AND (:username IS NULL OR LOWER(u.username) LIKE LOWER(CONCAT('%', :username, '%'))) " +
            " AND (:email IS NULL OR LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%'))) " +
            " AND (:role IS NULL OR LOWER(u.role) LIKE LOWER(CONCAT('%', :role, '%'))) " +
            " AND (:employees_id_name IS NULL OR LOWER(u.employees_id.name) LIKE LOWER(CONCAT('%', :employees_id_name, '%')))";
    private String username;
    private String email;
    private String role;
    private String employees_id_name;

    public String buildUserAllKey(UserAllFiltersDTO filters) {
        return +'_' + safe(filters.getUsername()) + "_" + safe(filters.getEmail()) + "_" + safe(filters.getRole()) + "_" + safe(filters.getEmployees_id_name());
    }

    private String safe(Object o) {
        return o == null ? "" : o.toString();
    }
}
