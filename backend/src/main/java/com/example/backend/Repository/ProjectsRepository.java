package com.example.backend.Repository;


import com.example.backend.Model.Class.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectsRepository  extends JpaRepository<Projects, String> {
}
