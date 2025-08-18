package com.example.backend;

import com.example.backend.Model.Dto.CountViewDTO;
import com.example.backend.Model.Enum.ProcessLogStatus;
import com.example.backend.Model.View.CountView;
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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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

    public static PageRequest generatePaginateOfSearch(){
        return PageRequest.of(0, 10);
    }

    public static List<Object[]> generateDateWithStartTimeAndEndTIme(List<Object[]> results, String columns) {
        List<String> cols = List.of(columns.split(","));
        OptionalInt indexEnd = IntStream.range(0, cols.size()).filter(i -> cols.get(i).contains("end_time")).findFirst();
        OptionalInt indexStart = IntStream.range(0, cols.size()).filter(i -> cols.get(i).contains("start_time")).findFirst();
        for (Object[] row : results) {
            indexEnd.ifPresent(i -> row[i] = BackendApplication.generateDateTime(row, i));
            indexStart.ifPresent(i -> row[i] = BackendApplication.generateDateTime(row, i));
        }

        return results;
    }

    public static <E extends Enum<E>> List<CountViewDTO> generateObjectByStatus(
            List<CountView> results,
            Class<E> enumClass
    ) {
        Map<String, Long> resultMap = results.stream()
                .collect(Collectors.toMap(CountView::getStatus, CountView::getCount));
        List<CountViewDTO> completeResult = new ArrayList<>();
        for (E enumConstant : enumClass.getEnumConstants()) {
            String key = enumConstant.name();
            Long count = resultMap.getOrDefault(key, 0L);
            completeResult.add(new CountViewDTO(key, count));
        }
        return completeResult;
    }


    private static String generateDateTime(Object[] row, int columnIndex) {
        if (row[columnIndex] instanceof LocalDateTime endTime) {
            return endTime.format(DateTimeFormatter.ofPattern("dd MMM yyyy", Locale.ENGLISH));
        } else {
            return "Invalid date";
        }
    }
}
