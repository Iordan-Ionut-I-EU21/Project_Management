package com.example.backend.Repository;

import com.example.backend.Model.Class.Parts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartsRepository extends JpaRepository<Parts, String> {
}
