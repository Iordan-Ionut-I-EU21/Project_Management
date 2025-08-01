package com.example.backend.Model.Enum;

import lombok.Getter;

@Getter
public enum PartCategory {
    ENGINE("ENGINE"),
    SUSPENSION("SUSPENSION"),
    INTERIOR("INTERIOR"),
    TRANSMISSION("TRANSMISSION"),
    ELECTRICAL("ELECTRICAL"),
    EXTERIOR("EXTERIOR"),
    BRAKES("BRAKES"),
    FUEL_SYSTEM("FUEL_SYSTEM"),
    COOLING("COOLING"),
    STEERING("STEERING");
    private final String label;

    PartCategory(String label) {
        this.label = label;
    }

	@Override
    public String toString() {
        return label;
    }
}
