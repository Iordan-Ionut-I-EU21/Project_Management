package com.example.backend.Repository;


import com.example.backend.Model.Class.SubTasks;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubTasksRepository extends JpaRepository<SubTasks, String> {
    @Query("select st from SubTasks st where st.taskId.id = :taskId")
    List<SubTasks> getListById(@Param("taskId") final String taskId, Pageable pageable);

    @Query("select count(st.id) from SubTasks st where st.taskId.id = :taskId")
    Long getCountById(@Param("taskId") final String taskId);

}
