package com.example.backend.Model.Class;

import com.example.backend.Configuration.BlobSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
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
    @Lob
    @JsonSerialize(using = BlobSerializer.class)
    @Column(name =" description")
    private Blob description;
}
