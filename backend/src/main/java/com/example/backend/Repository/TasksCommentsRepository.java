package com.example.backend.Repository;


import com.example.backend.Model.Class.TaskComments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TasksCommentsRepository extends JpaRepository<TaskComments, String> {
    @Query("select tc from TaskComments tc where tc.taskId.id = :taskId order by tc.createdAt desc")
    List<TaskComments> getListByTaskId(@Param("taskId") final String taskId);
}
