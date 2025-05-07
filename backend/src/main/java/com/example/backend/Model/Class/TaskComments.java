package com.example.backend.Model.Class;


import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "TASK_COMMNETS")
public class TaskComments {
    @Id
    private String id;
    @ManyToOne
    @JoinColumn(name ="taskId")
    private  Tasks taskId;
    @ManyToOne
    @JoinColumn(name ="userId")
    private  User userId;
    @Column(name = "commnet")
    private  String commnet;
    @Column(name = "createdAt")
    private Timestamp createdAt;
}
