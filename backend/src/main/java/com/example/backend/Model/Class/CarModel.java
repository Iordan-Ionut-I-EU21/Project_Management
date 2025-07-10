package com.example.backend.Model.Class;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Cacheable
@Data
@Entity
@Table(name = "CAR_MODEL")
public class CarModel {
    @Id
    private String id;
    @Column(name = "name")
    private String name;
    @Column(name = "generation")
    private Integer generation;
    @Column(name = "release_year")
    private Integer release_year;
}
