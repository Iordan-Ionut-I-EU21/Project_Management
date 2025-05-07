package com.example.backend.Repository;

import com.example.backend.Model.Class.User;
import com.example.backend.Model.Enum.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query("select u from User u where u.role = :role")
    List<User> getUserByRole(@Param("role") final UserRole role);

    @Query("select p.managerId from Projects p where p.id = :projectsId")
    List<User> getUserByProjects(@Param("projectsId") final String projectsId);

    @Query("select u from User u where u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);

    List<User> findAllByEmailIn(Collection<String> emails);

}
