package com.example.backend.Service;


import com.example.backend.Model.Class.Milestones;
import com.example.backend.Repository.MilestonesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MilestonesService {
    @Autowired
    private MilestonesRepository milestonesRepository;

    public void postMilestones(final List<Milestones> milestones) {
        this.milestonesRepository.saveAll(milestones);
    }
}
