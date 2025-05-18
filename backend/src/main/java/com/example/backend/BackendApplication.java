package com.example.backend;

import com.example.backend.Utility.ChangePage;
import com.example.backend.Utility.SortPage;
import com.example.backend.Utility.TableRequest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@EnableCaching
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    public static String generateId() {
        return UUID.randomUUID().toString();
    }

    public static PageRequest generateTablePage(final TableRequest tableRequest) {
        ChangePage changePage = tableRequest.getChangePage();
        SortPage sortPage = tableRequest.getSortPage();
        Sort sort = Sort.unsorted();

        if (sortPage != null && sortPage.getColumn() != null && sortPage.getDirection() != null && !sortPage.getDirection().trim().isEmpty()) {
            if ("DESC".equalsIgnoreCase(sortPage.getDirection())) {
                sort = Sort.by(Sort.Order.desc(sortPage.getColumn()));
            } else {
                sort = Sort.by(Sort.Order.asc(sortPage.getColumn()));
            }
        }

        return PageRequest.of((int) Math.max(0, changePage.getPageIndex()), Math.toIntExact(changePage.getPageSize()), sort);
    }
}
