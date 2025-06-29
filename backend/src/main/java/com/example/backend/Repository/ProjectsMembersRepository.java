package com.example.backend.Repository;

import com.example.backend.Model.Class.ProjectsMembers;
import com.example.backend.Model.Class.User;
import com.example.backend.Model.Enum.Role;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectsMembersRepository extends JpaRepository<ProjectsMembers, String> {
    @Query("select count(pm.projectId.id) from ProjectsMembers pm  where pm.userId.email = :email")
    Long getCountOfProjectsByUserEmail(@Param("email") final String email);

    @Query("select count(pm.id) from ProjectsMembers pm where pm.userId.id = :userId and pm.role = :role")
    Long getCountByRole(@Param("userId") final String userId, @Param("role") final Role role);

    @Query("select pm from ProjectsMembers pm where pm.projectId.id = :projectId")
    List<ProjectsMembers> getDataUsersByProjectId(@Param("projectId") final String projectId, Pageable pageable);

    @Query("select count(pm.id) from ProjectsMembers pm where pm.projectId.id = :projectId")
    Long getCountUsersByProjectId(@Param("projectId") final String projectId);
}
