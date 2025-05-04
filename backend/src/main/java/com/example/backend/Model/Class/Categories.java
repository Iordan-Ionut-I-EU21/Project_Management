package com.example.backend.Model.Class;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Entity
@Table(name = "CATEGORIES")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Categories {
    @Id
    private String id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
}
