package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.User;
import com.example.backend.Model.Enum.UserRole;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getUserByRole(final UserRole role) {
        return this.userRepository.getUserByRole(role);
    }

    public List<User> getUserByProjects(final String projectId){
        return this.userRepository.getUserByProjects(projectId);
    }

    public List<String> getExistingEmails(Set<String> emails) {
        return userRepository.findAllByEmailIn(emails)
                       .stream()
                       .map(User::getEmail)
                       .collect(Collectors.toList());
    }

    public void postUsers(final List<User> user) {
        userRepository.saveAll(user);
    }

    public List<User> getAllUsers(){
        return this.userRepository.findAll();
    }

    public User getUserById(final String id){
        return this.userRepository.getUserById(id);
    }

    public User getUserByNameAndEmail(final String name, final String email){
        return this.userRepository.getUserByNameAndEmail(name, email);
    }

    public List<User> getAllUserDifferentOnRole(final UserRole role) {
        return this.userRepository.getAllUserDifferentOnRole(role);
    }

    public Boolean getUserByEmail(final String email) {
        return this.userRepository.findByEmail(email).isPresent();
    }

    public User postNewUser(final User user){
        user.setId(BackendApplication.generateId());
        return this.userRepository.save(user);
    }
}
