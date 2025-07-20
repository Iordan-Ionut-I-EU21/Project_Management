package com.example.backend.Model.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInformationDTO {
    private Long countProcessLog;
    private Long countCars;
    private Long countProcessLogStatus;
    private Long countQualityChecks;
}
