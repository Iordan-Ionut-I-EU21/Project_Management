package com.example.backend.Model.Class;


import com.example.backend.Model.Enum.Priority;
import com.example.backend.Model.Enum.Status;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "TASKS")
public class Tasks {
    @Id
    private String id;
    @ManyToOne
    @JoinColumn(name = "projectId")
    private Projects projectId;
    @ManyToOne
    @JoinColumn(name = "assignedId")
    private User assignedId;
    @Column(name = "title")
    private String title;
    @Lob
    @Column(name = "description")
    private  String description;
    @Column(name = "dueDate")
    private Timestamp dueDate;
    @Enumerated(EnumType.STRING)
    private Status status;
    @Enumerated(EnumType.STRING)
    private Priority priority;
    @Column(name = "createdAt")
    private  Timestamp createdAt;
}
