package com.example.backend.Model.Class;


import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "ACTIVITIES")
@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Activities {
    @Id
    private String id;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User userId;
    @ManyToOne
    @JoinColumn(name = "projectId")
    private Projects projectId;
    @Column(name = "action", length = 50000)
    private String action;
    @Column(name = "createdAt")
    private Timestamp createdAt;
}
