package com.example.backend.Repository;


import com.example.backend.Model.Class.ProjectsMembers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectsMembersRepository extends JpaRepository<ProjectsMembers, String> {
}
