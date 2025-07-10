package com.example.backend.Model.Class;

import com.example.backend.Model.Enum.PartCategory;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Cacheable
@Getter
@Setter
@Entity
@Table(name = "PARTS")
public class Parts {
    @Id
    private String id;
    @Column(name = "name")
    private String name;
    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private PartCategory category;
    @Column(name = "unit_cost")
    private Double unit_cost;
}
