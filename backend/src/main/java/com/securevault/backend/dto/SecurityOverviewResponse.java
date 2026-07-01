package com.securevault.backend.dto;

import java.util.List;

import com.securevault.backend.security.overview.SecurityActivity;
import com.securevault.backend.security.overview.SecurityRecommendation;
import com.securevault.backend.security.overview.SecurityRisk;

public class SecurityOverviewResponse {

    private int securityScore;

    private int totalAssets;

    private int totalFiles;

    private int passwordCount;

    private int apiKeyCount;

    private int noteCount;

    private int weakPasswords;

    private int reusedPasswords;

    private int oldPasswords;

    private List<SecurityActivity> activities;

    private List<SecurityRecommendation> recommendations;

    private List<SecurityRisk> risks;

    public SecurityOverviewResponse() {
    }

    public int getSecurityScore() {
        return securityScore;
    }

    public void setSecurityScore(int securityScore) {
        this.securityScore = securityScore;
    }

    public int getTotalAssets() {
        return totalAssets;
    }

    public void setTotalAssets(int totalAssets) {
        this.totalAssets = totalAssets;
    }

    public int getTotalFiles() {
        return totalFiles;
    }

    public void setTotalFiles(int totalFiles) {
        this.totalFiles = totalFiles;
    }

    public int getPasswordCount() {
        return passwordCount;
    }

    public void setPasswordCount(int passwordCount) {
        this.passwordCount = passwordCount;
    }

    public int getApiKeyCount() {
        return apiKeyCount;
    }

    public void setApiKeyCount(int apiKeyCount) {
        this.apiKeyCount = apiKeyCount;
    }

    public int getNoteCount() {
        return noteCount;
    }

    public void setNoteCount(int noteCount) {
        this.noteCount = noteCount;
    }

    public int getWeakPasswords() {
        return weakPasswords;
    }

    public void setWeakPasswords(int weakPasswords) {
        this.weakPasswords = weakPasswords;
    }

    public int getReusedPasswords() {
        return reusedPasswords;
    }

    public void setReusedPasswords(int reusedPasswords) {
        this.reusedPasswords = reusedPasswords;
    }

    public int getOldPasswords() {
        return oldPasswords;
    }

    public void setOldPasswords(int oldPasswords) {
        this.oldPasswords = oldPasswords;
    }

    public List<SecurityActivity> getActivities() {
        return activities;
    }

    public void setActivities(List<SecurityActivity> activities) {
        this.activities = activities;
    }

    public List<SecurityRecommendation> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<SecurityRecommendation> recommendations) {
        this.recommendations = recommendations;
    }

    public List<SecurityRisk> getRisks() {
        return risks;
    }

    public void setRisks(List<SecurityRisk> risks) {
        this.risks = risks;
    }
}