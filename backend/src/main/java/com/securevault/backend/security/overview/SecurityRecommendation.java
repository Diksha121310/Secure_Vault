package com.securevault.backend.security.overview;

public class SecurityRecommendation {

    private String title;
    private String severity;

    public SecurityRecommendation() {}

    public SecurityRecommendation(String title, String severity) {
        this.title = title;
        this.severity = severity;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }
}