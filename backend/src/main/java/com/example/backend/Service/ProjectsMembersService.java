package com.example.backend.Service;


import com.example.backend.Model.Class.ProjectsMembers;
import com.example.backend.Model.Enum.Role;
import com.example.backend.Repository.ProjectsMembersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectsMembersService {
    @Autowired
    private ProjectsMembersRepository projectsMembersRepository;

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
}
