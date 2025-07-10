package com.example.backend.Model.Class;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Entity
@Cacheable
@Table(name = "PART_SUPPLIERS")
public class PartSuppliers {
    @Id
    private String id;
    @Column(name = "delivery_time_days")
    private LocalDateTime delivery_time_days;
    @ManyToOne
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    private Suppliers supplier_id;
    @ManyToOne
    @JoinColumn(name = "part_id", referencedColumnName = "id")
    private Parts part_id;
}
