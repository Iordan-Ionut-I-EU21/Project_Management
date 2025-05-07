package com.example.backend.Model.Class;


import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "AUDIT_LOGS")
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class AuditLogs {
    @Id
    private String id;
    @Column(name = "action")
    private String action;
    @Column(name = "description")
    private String description;
    @Column(name = "createdAt")
    private Timestamp createdAt;
}
