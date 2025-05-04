package com.example.backend.Repository;

import com.example.backend.Model.Class.Activities;
import com.example.backend.Model.Class.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivitiesRepository  extends JpaRepository<Activities, String> {
}
