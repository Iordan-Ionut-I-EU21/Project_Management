package com.example.backend.Model.Class;

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
@Table(name = "PART_PRODUCTION")
public class PartProduction {
    @Id
    private String id;
    @Column(name = "produced_date")
    private LocalDateTime produced_date;
    @Column(name = "quantity")
    private Integer quantity;
    @ManyToOne
    @JoinColumn(name = "machine_id",referencedColumnName = "id")
    private Machines machine_id;
    @ManyToOne
    @JoinColumn(name = "part_id",referencedColumnName = "id")
    private Parts part_id;
}
