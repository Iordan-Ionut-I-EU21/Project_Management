package com.example.backend.Repository;


import com.example.backend.Model.Class.ProjectsMembers;
import com.example.backend.Model.Enum.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectsMembersRepository extends JpaRepository<ProjectsMembers, String> {
    @Query("select count(pm.projectId.id) from ProjectsMembers pm  where pm.userId.email = :email")
    Long getCountOfProjectsByUserEmail(@Param("email") final String email);

    @Query("select count(pm.id) from ProjectsMembers pm where pm.userId.id = :userId and pm.role = :role")
    Long getCountByRole(@Param("userId") final String userId, @Param("role") final Role role);
}
