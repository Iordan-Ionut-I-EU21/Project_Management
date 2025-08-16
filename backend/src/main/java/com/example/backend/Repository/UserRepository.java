package com.example.backend.Repository;

import com.example.backend.Model.Class.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	@Query("SELECT u FROM User u WHERE u.email = :email ")
	Optional<User> findByEmail(@Param("email") String email);

	@Query("SELECT u FROM User u WHERE LOWER(u.id) = :user_username_or_id_or_email OR LOWER(u.username) = :user_username_or_id_or_email OR LOWER(u.email) = :user_username_or_id_or_email ")
	User findUserByUsernameOrId(@Param("user_username_or_id_or_email") String user_username_or_id_or_email);

	@Query("SELECT COUNT(qc.id) FROM QualityChecks qc WHERE LOWER(qc.inspector_id.user_id.id) = :user_username_or_id_or_email OR LOWER(qc.inspector_id.user_id.username) = :user_username_or_id_or_email OR LOWER(qc.inspector_id.user_id.email) = :user_username_or_id_or_email")
	Integer canAccessQualityCheck(@Param("user_username_or_id_or_email") final String user_username_or_id_or_email);

	@Query("SELECT COUNT(pl.id) FROM ProcessLog pl WHERE LOWER(pl.employee_id.user_id.id) = :user_username_or_id_or_email OR LOWER(pl.employee_id.user_id.username) = :user_username_or_id_or_email OR LOWER(pl.employee_id.user_id.email) = :user_username_or_id_or_email")
	Integer canAccessProcessLog(@Param("user_username_or_id_or_email") final String user_username_or_id_or_email);

	@Query("SELECT COUNT(cp.id) FROM CarParts cp WHERE LOWER(cp.installed_by.user_id.id) = :user_username_or_id_or_email OR LOWER(cp.installed_by.user_id.username) = :user_username_or_id_or_email OR LOWER(cp.installed_by.user_id.email) = :user_username_or_id_or_email")
	Integer canAccessCarParts(@Param("user_username_or_id_or_email") final String user_username_or_id_or_email);

}
