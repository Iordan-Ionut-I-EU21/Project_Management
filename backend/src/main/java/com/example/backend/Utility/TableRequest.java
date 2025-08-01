package com.example.backend.Utility;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TableRequest {
    private ChangePage changePage;
    private SortPage sortPage;
    public static final String KEY = "+ '_' + #tableRequest.changePage.pageIndex + '_' + #tableRequest.changePage.pageSize" + " +" + " '_' + (#tableRequest.sortPage?.column ?: '') + '_' + (#tableRequest.sortPage?.direction ?: '')+ ";
}
