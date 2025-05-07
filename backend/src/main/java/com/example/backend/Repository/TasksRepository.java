package com.example.backend.Repository;


import com.example.backend.Model.Class.Tasks;
import com.example.backend.Model.Class.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, String> {
    @Query("select t.assignedId from Tasks t where t.id = :id")
    List<User> findUserByTaskId(final String id);
}
