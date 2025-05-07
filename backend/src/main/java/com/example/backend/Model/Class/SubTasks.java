package com.example.backend.Model.Class;

import com.example.backend.Model.Enum.Progress;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Data
@Table(name = "SUB_TASKS")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SubTasks {
    @Id
    private String id;
    @ManyToOne
    @JoinColumn(name ="taskId")
    private Tasks taskId;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "dueDate")
    private Timestamp dueDate;
    @Enumerated(EnumType.STRING)
    private Progress progress;
}
