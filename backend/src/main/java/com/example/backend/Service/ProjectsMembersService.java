package com.example.backend.Service;


import com.example.backend.Model.Class.ProjectsMembers;
import com.example.backend.Repository.ProjectsMembersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectsMembersService {
    @Autowired
    private ProjectsMembersRepository projectsMembersRepository;

    public void postProjectsMembers(final List<ProjectsMembers> projectsMembers) {
        this.projectsMembersRepository.saveAll(projectsMembers);
    }
}
