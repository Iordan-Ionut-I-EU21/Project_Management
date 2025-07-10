package com.example.backend.Model.Class;

import com.example.backend.Model.Enum.ProcessLogStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Entity
@Cacheable
@Table(name = "PROCESS_LOG")
public class ProcessLog {
    @Id
    private String id;
    @Column(name = "start_time")
    private LocalDateTime start_time;
    @Column(name = "end_time")
    private LocalDateTime end_time;
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ProcessLogStatus status;
    @ManyToOne
    @JoinColumn(name = "process_id", referencedColumnName = "id")
    private Process process_id;
    @ManyToOne
    @JoinColumn(name ="employee_id", referencedColumnName = "id")
    private Employees employee_id;
    @ManyToOne
    @JoinColumn(name = "car_id", referencedColumnName = "id")
    private Cars car_id;
    @ManyToOne
    @JoinColumn(name = "machine_id", referencedColumnName = "id")
    private Machines machine_id;
}
