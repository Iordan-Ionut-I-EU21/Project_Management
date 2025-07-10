package com.example.backend.Model.Class;

import com.example.backend.Model.Enum.CarsStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.convert.DataSizeUnit;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Cacheable
@Setter
@Data
@Entity
@Table(name = "CARS")
public class Cars {
    @Id
    private String id;
    @Column(name = "vin", unique = true)
    private String vin;
    @Column(name = "assembly_date")
    private LocalDateTime assembly_date;
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private CarsStatus status;
    @OneToOne
    @JoinColumn(name = "model_id", referencedColumnName = "id")
    private CarModel model_id;
}
