package com.example.backend.Repository;

import com.example.backend.Model.Class.Projects;
import com.example.backend.Model.Class.Tasks;
import com.example.backend.Model.Enum.Status;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectsRepository  extends JpaRepository<Projects, String> {
    @Query("select pm.projectId from ProjectsMembers pm  where pm.userId.email = :email")
    List<Projects> postDataOfProjectsByUserEmail(@Param("email") final String email, Pageable pageable);

    @Query("select count(pm.projectId) from ProjectsMembers pm  where pm.userId.email = :email")
    Long getCountProjectsByUserEmail(@Param("email") String email);

    @Query("select count(t.id) from Tasks t where t.status = :status and t.projectId.id = :projectId")
    Long countByStatus(@Param("status") Status status, @Param("projectId") String projectId);

    @Query("select t from Tasks t where t.projectId.id = :projectId")
    List<Tasks> getListByProjectId(@Param("projectId") final String projectId, Pageable pageable);

    @Query("select count(t.id) from Tasks t WHERE t.projectId.id = :projectId")
    Long getCountByProjectId(@Param("projectId") final String projectId);

    @Query(value = "SELECT DISTINCT * FROM projects p WHERE LOWER(p.name) LIKE LOWER(CONCAT(:name, '%')) LIMIT 7", nativeQuery = true)
     List<Projects> getDataForSuggestion(@Param("name") final String name);

    @Query("select p from Projects p where  LOWER(p.name) LIKE LOWER(CONCAT(:name, '%'))")
    List<Projects> postDataOfProjectsBySuggestion(@Param("name") final String name, Pageable pageable);

    @Query("select count(p.id) from Projects p WHERE LOWER(p.name) LIKE LOWER(CONCAT(:name, '%'))")
    Long postCountOfProjectsBySuggestion(@Param("name") final String name);
}
