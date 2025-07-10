package com.example.backend.Model.Class;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
@Data
@Entity
@Cacheable
@Table(name = "PARTS")
public class Parts {
    @Id
    private String id;
    @Column(name = "quantity")
    private Integer quantity;
    @Column(name = "installed_at")
    private LocalDateTime installed_at;

    private Cars cars_id;
    private Parts parts_id;
    private Employees installed_by;
}
