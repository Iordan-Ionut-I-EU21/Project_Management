package com.example.backend.Model.Class;


import jakarta.persistence.*;
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
    @Lob
    @Column(name = "description")
    private String description;

}
