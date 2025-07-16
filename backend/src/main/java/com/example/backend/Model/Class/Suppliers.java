package com.example.backend.Model.Class;

import com.example.backend.Configuration.BlobSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
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
    @Lob
    @JsonSerialize(using = BlobSerializer.class)
    @Column(name = "contact_info")
    private Blob contact_info;
}
