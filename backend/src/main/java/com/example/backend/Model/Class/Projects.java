package com.example.backend.Model.Class;


import com.example.backend.Model.Enum.Status;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "PROJECTS")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Projects {
    @Id
    private String id;
    @Column(name = "name")
    private String name;
    @Lob
    @Column(name = "description")
    private String Description;
    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Categories categoryId;
    @Column(name = "startDate")
    private Timestamp startDate;
    @Column(name = "endDate")
    private Timestamp endDate;
    @Enumerated(EnumType.STRING)
    private Status status;
    @ManyToOne
    @JoinColumn(name ="managerId")
    private User managerId;
}
