package com.example.backend.Model.Enum;

public enum UserRole {
    ADMIN("Admin"), WORKER("Worker"), MANAGER("Manager");

    private final String label;

    UserRole(String label) {
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
