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
    private  String id;
    @OneToOne
    private User userId;
    @OneToOne
    private Projects projectId;
    @Column(name = "action")
    private String action;
    @Column (name = "createdAt")
    private Timestamp createdAt;
}
