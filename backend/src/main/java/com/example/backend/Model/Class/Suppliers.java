package com.example.backend.Model.Class;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Data
@Entity
@Cacheable
@Table(name= "SUPPLIERS")
public class Suppliers {
    @Id
    private String id;
    @Column(name= "name")
    private String name;
    @Column(name = "contact_info")
    private Blob contact_info;
}
