package com.example.backend.Model.Class;

import com.example.backend.Configuration.BlobSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Entity
@Cacheable
@Table(name = "QUALITY_CHECKS")
public class QualityChecks {
    @Id
    private String id;
    @Column(name = "check_date")
    private LocalDateTime check_date;
    @Column(name = "passed")
    private Boolean passed;
    @Lob
    @Column(name = "notes")
    @JsonSerialize(using = BlobSerializer.class)
    private Blob notes;
    @ManyToOne
    @JoinColumn(name = "car_id", referencedColumnName = "id")
    private Cars car_id;
    @ManyToOne
    @JoinColumn(name = "inspector_id", referencedColumnName = "id")
    private Employees inspector_id;
}
