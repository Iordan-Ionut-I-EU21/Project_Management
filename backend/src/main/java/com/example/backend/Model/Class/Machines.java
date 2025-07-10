package com.example.backend.Model.Class;

import com.example.backend.Model.Enum.MachineStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Cacheable
@Data
@Entity
@Table(name = "MACHINES")
public class Machines {
    @Id
    private String id;
    @Column(name= "name")
    private String name;
    @Column(name = "Type")
    private String type;
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private MachineStatus status;
    @Column(name = "last_maintenance")
    private LocalDateTime last_maintenance;
}
