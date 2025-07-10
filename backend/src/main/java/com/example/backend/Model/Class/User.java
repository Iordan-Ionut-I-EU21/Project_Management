package com.example.backend.Model.Class;


import com.example.backend.Model.Enum.UserRole;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Cacheable
@Data
@Table(name = "USERS")
@Entity
public class User {
    @Id
    private String id;
    @Column(name= "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name ="email", unique = true)
    private String email;
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role;
    @OneToOne
    @JoinColumn(name = "employees_id", referencedColumnName = "id")
    private Employees employees_id;
}
