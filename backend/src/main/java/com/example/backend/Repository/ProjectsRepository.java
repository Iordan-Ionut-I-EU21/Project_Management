package com.example.backend.Repository;


import com.example.backend.Model.Class.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectsRepository  extends JpaRepository<Projects, String> {
    @Query("select pm.projectId from ProjectsMembers pm  where pm.userId.email = :email")
    List<Projects> getDataOfProjectsByUserEmail(@Param("email") final String email);
}
