package com.example.backend.Repository;


import com.example.backend.Model.Class.Tasks;
import com.example.backend.Model.Class.User;
import com.example.backend.Model.Enum.Priority;
import com.example.backend.Model.Enum.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, String> {
    @Query("select t.assignedId from Tasks t where t.id = :id")
    List<User> findUserByTaskId(final String id);

    @Query("select count(t.id) from Tasks t where t.assignedId.email = :email and t.status = :status")
    Long getCountOfTasksByUserEmail(@Param("email") final String email, @Param("status") final Status status);
}
