package com.example.backend.Model.Class;

import com.example.backend.Model.Enum.Role;
import jakarta.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@Entity
@Table(name = "PROJECTS_MEMBERS")
@AllArgsConstructor
@NoArgsConstructor
public class ProjectsMembers {
    @Id
    private String id;
    @ManyToOne
    @JoinColumn(name = "projectId", nullable = false)
    private Projects projectId;
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User userId;
    @Enumerated(EnumType.STRING)
    private Role role;
}
