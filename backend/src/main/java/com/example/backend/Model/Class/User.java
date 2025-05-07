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
    @Column(name = "name")
    private String name;
    @Column(unique = true, name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    @Column(name = "created_at")
    private Timestamp createdAt;
}
