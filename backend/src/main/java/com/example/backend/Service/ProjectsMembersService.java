package com.example.backend.Service;


import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.Projects;
import com.example.backend.Model.Class.ProjectsMembers;
import com.example.backend.Model.Class.User;
import com.example.backend.Model.Enum.Role;
import com.example.backend.Repository.ProjectsMembersRepository;
import com.example.backend.Utility.TableRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectsMembersService {
    @Autowired
    private ProjectsMembersRepository projectsMembersRepository;
    @Autowired
    private EntityManager entityManager;

    public void postProjectsMembers(final List<ProjectsMembers> projectsMembers) {
        this.projectsMembersRepository.saveAll(projectsMembers);
    }

    public Long getCountOfProjectsByUserEmail(final String email){
        return this.projectsMembersRepository.getCountOfProjectsByUserEmail(email);
    }

    public Map<Role, Long> getCountByRole(final String userId){
        Map<Role, Long> result = new EnumMap<>(Role.class);
        for(Role role: Role.values()){
            result.put(role, this.projectsMembersRepository.getCountByRole(userId, role));
        }
        return result;
    }

    public ProjectsMembers postNewProjectMembers(final ProjectsMembers projectsMembers){
        projectsMembers.setId(BackendApplication.generateId());
        return this.projectsMembersRepository.save(projectsMembers);
    }

    public List<ProjectsMembers> getDataUsersByProjectId(final String projectId, final TableRequest tableRequest){
        Pageable pageable = BackendApplication.generateTablePage(tableRequest);
        return this.projectsMembersRepository.getDataUsersByProjectId(projectId, pageable);
    }

    public List<Object[]> getExcelUsersByProjectId(final String excel, final String projectId){
        TypedQuery<Object[]> query = this.entityManager.createQuery("select "+excel+" from "+ProjectsMembers.class.getSimpleName() + " pm where pm.projectId.id = :projectId", Object[].class);
        query.setParameter("projectId",projectId);
        return  query.getResultList();
    }

    public Long getCountUsersByProjectId(final String projectId){
        return this.projectsMembersRepository.getCountUsersByProjectId(projectId);
    }
}
