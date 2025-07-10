package com.example.backend.Model.Class;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Cacheable
@Entity
@Table(name = "PROCESS")
public class Process {
    @Id
    private String id;
    @Column(name = "name")
    private String name;
    @Column(name =" description")
    private Blob description;
}
