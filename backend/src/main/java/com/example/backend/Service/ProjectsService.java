package com.example.backend.Service;


import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.Projects;
import com.example.backend.Model.Enum.Status;
import com.example.backend.Repository.ProjectsRepository;
import com.example.backend.Utility.TableRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

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

    public Long getCountProjectsByUserEmail(final String email) {
        return projectsRepository.getCountProjectsByUserEmail(email);
    }

    public List<Projects> postDataOfProjectsByUserEmail(final String email, final TableRequest tableRequest) {
        Pageable pageable = BackendApplication.generateTablePage(tableRequest);
        return projectsRepository.postDataOfProjectsByUserEmail(email, pageable);
    }
}
