package com.example.backend.Model.Class;
import com.example.backend.Model.Enum.Progress;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "MILESTONES")
@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
public class Milestones {
    @Id
    private String id;
    @ManyToOne
    @JoinColumn(name = "projectId")
    private Projects projectId;
    @Column(name = "title")
    private String title;
    @Lob
    @Column(name = "description")
    private String description;
    @Column(name = "dueDate")
    private Timestamp dueDate;
    @Enumerated(EnumType.STRING)
    private Progress progress;

}
