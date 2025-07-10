package com.example.backend.Model.Enum;

public enum MachineStatus {
    OPERATIONAL("Operational"),
    UNDER_MAINTENANCE("Under Maintenance"),
    IDLE("Idle"),
    OUT_OF_ORDER("Out of Order"),
    NEEDS_INSPECTION("Needs Inspection"),
    CALIBRATING("Calibrating"),
    RETIRED("Retired");

    private final String displayName;

    MachineStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
