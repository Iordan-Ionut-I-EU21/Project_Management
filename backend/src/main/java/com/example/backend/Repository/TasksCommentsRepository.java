package com.example.backend.Repository;

import com.example.backend.Model.Class.TaskComments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TasksCommentsRepository extends JpaRepository<TaskComments, String> {
}
