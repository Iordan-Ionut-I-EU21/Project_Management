package com.example.backend.Model.Class;

import com.example.backend.Model.Enum.EmployeeRole;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.lang.reflect.Type;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Cacheable
@Setter
@Data
@Entity
@Table(name = "EMPLOYESS")
public class Employees {
    @Id
    private String id;
    @Column(name = "name")
    private String name;
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private EmployeeRole role;
    @Column(name = "department")
    private String department;
    @Column(name = "hire_date")
    private LocalDateTime hire_date;
    @OneToOne(mappedBy = "employees_id", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("employees_id")
    private User user_id;
}
