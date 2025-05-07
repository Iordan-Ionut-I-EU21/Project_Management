package com.example.backend.Service;


import com.example.backend.Model.Class.Activities;
import com.example.backend.Repository.ActivitiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivitiesService {
    @Autowired
    private ActivitiesRepository activitiesRepository;

    public void postActivities(final List<Activities> activities) {
        this.activitiesRepository.saveAll(activities);
    }
}
