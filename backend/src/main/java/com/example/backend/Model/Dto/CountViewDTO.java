package com.example.backend.Model.Dto;

import com.example.backend.Model.View.CountView;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ProcessStatusCountViewDTO implements CountView {
    private String status;
    private Long count;
}
