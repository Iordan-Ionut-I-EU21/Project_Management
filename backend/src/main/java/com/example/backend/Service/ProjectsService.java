package com.example.backend.Service;


import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.Projects;
import com.example.backend.Model.Class.Tasks;
import com.example.backend.Model.Enum.Status;
import com.example.backend.Repository.ProjectsRepository;
import com.example.backend.Utility.TableRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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
        Pageable firstTen = PageRequest.of(0, 40);
        return this.projectsRepository.findAll(firstTen).getContent();
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

    public Map<Status, Long> getStatusCounts(final String projectId) {
        Map<Status, Long> counts = new EnumMap<>(Status.class);
        for (Status status : Status.values()) {
            counts.put(status, projectsRepository.countByStatus(status, projectId));
        }
        return counts;
    }

    public List<Tasks> getListByProjectId(final String projectId, final TableRequest tableRequest){
        Pageable pageable = BackendApplication.generateTablePage(tableRequest);
        return this.projectsRepository.getListByProjectId(projectId,pageable);
    }

    public Long getCountByProjectId(final String projectId){
        return this.projectsRepository.getCountByProjectId(projectId);
    }

    public List<Projects> getDataForSuggestion(final String name){
        return this.projectsRepository.getDataForSuggestion(name);
    }

    public Long postCountOfProjectsBySuggestion(final String name){
        return this.projectsRepository.postCountOfProjectsBySuggestion(name);
    }

    public List<Projects> postDataOfProjectsBySuggestion(final String name, final TableRequest tableRequest){
        Pageable pageable = BackendApplication.generateTablePage(tableRequest);
        return this.projectsRepository.postDataOfProjectsBySuggestion(name,pageable);
    }

    public Projects postNewProjects(final Projects projects){
        projects.setId(BackendApplication.generateId());
        return this.projectsRepository.save(projects);
    }
}
