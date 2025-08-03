package com.example.backend.Utility;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component("tableRequestCacheKeyHelper")
public class TableRequest {
    private ChangePage changePage;
    private SortPage sortPage;

    public String buildProcessLogKey(TableRequest tableRequest) {
        StringBuilder key = new StringBuilder();

        if (tableRequest != null && tableRequest.getChangePage() != null) {
            key.append("_")
                    .append(tableRequest.getChangePage().getPageIndex())
                    .append("_")
                    .append(tableRequest.getChangePage().getPageSize());
        }

        if (tableRequest != null && tableRequest.getSortPage() != null) {
            key.append("_")
                    .append(nullToEmpty(tableRequest.getSortPage().getColumn()))
                    .append("_")
                    .append(nullToEmpty(tableRequest.getSortPage().getDirection()));
        }

        return key.toString();
    }

    private String nullToEmpty(String str) {
        return str == null ? "" : str;
    }
}
