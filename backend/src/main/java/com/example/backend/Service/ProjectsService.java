package com.example.backend.Service;


import com.example.backend.Model.Class.Projects;
import com.example.backend.Repository.ProjectsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectsService {
    @Autowired
    private ProjectsRepository projectsRepository;

    public List<Projects> getAllProjects() {
        return this.projectsRepository.findAll();
    }

    public void postProjects(List<Projects> projects) {
        this.projectsRepository.saveAll(projects);
    }

    public List<Projects> getDataOfProjectsByUserEmail(final String email){
        return this.projectsRepository.getDataOfProjectsByUserEmail(email);
    }
}
