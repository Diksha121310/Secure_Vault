package com.securevault.backend.security.overview;

public class SecurityRisk {

    private String title;
    private String riskLevel;

    public SecurityRisk() {}

    public SecurityRisk(String title, String riskLevel) {
        this.title = title;
        this.riskLevel = riskLevel;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }
}