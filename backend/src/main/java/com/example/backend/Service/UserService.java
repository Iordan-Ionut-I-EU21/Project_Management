package com.example.backend.Service;

import com.example.backend.Model.Class.User;
import com.example.backend.Model.Dto.*;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProcessLogService processLogService;
    @Autowired
    private CarsService carsService;
    @Autowired
    private QualityChecksService qualityChecksService;
    @Autowired
    private CarsPartsService carsPartsService;

    public void saveAll(List<User> users){
        this.userRepository.saveAll(users);
    }

    public List<User> finaAll(){
        return this.userRepository.findAll();
    }

    public Optional<User> findByEmail(final String email){
        return this.userRepository.findByEmail(email);
    }

    public Set<String> getAllEmails() {
        return userRepository.findAll().stream()
                .map(User::getEmail)
                .collect(Collectors.toSet());
    }

    public UserInformationDTO countInformationByUserName(final String name) {
        return new UserInformationDTO(this.processLogService.countByUserNameAndProcessLogFilters(name, new ProcessLogsFilterDTO()),
                this.carsService.countByUsernameAndCarsFilters(name, new CarsFiltersDTO()),
                this.qualityChecksService.countByUserName(name, new QualityChecksFiltersDTO()),
                this.carsPartsService.countByUserNameAndCarsPartsFilters(name, new CarsPartsFiltersDTO()));
    }
}
