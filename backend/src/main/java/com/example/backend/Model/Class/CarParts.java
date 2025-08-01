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
@Table(name = "CAR_PARTS")
public class CarParts {
    @Id
    private String id;
    @Column(name = "quantity")
    private Integer quantity;
    @Column(name = "installed_at")
    private LocalDateTime installed_at;
    @ManyToOne
    @JoinColumn(name = "car_id",referencedColumnName = "id")
    private Cars car_id;
    @ManyToOne
    @JoinColumn(name= "part_id", referencedColumnName = "id")
    private Parts part_id;
    @ManyToOne
    @JoinColumn(name ="installed_by", referencedColumnName = "id")
    private Employees installed_by;

    public static final String QUERY =" FROM CarParts cp LEFT JOIN Employees e ON e.id = cp.installed_by.id LEFT " +
            "JOIN User u ON u.employees_id.id = e.id WHERE ";
}
