package com.example.backend.Model.Enum;

public enum CarsStatus {
    IN_PRODUCTION("In Production"),
    ASSEMBLED("Assembled"),
    SHIPPED("Shipped"),
    QC_FAILED("QC Failed");

    private final String label;

    CarsStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    @Override
    public String toString() {
        return label;
    }
}
