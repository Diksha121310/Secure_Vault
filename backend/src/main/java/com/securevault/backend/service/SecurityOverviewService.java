package com.securevault.backend.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.securevault.backend.dto.SecurityOverviewResponse;
import com.securevault.backend.model.VaultItem;
import com.securevault.backend.repository.VaultRepository;
import com.securevault.backend.security.overview.SecurityActivity;
import com.securevault.backend.security.overview.SecurityRecommendation;
import com.securevault.backend.security.overview.SecurityRisk;
import com.securevault.backend.security.overview.SecurityScoreCalculator;
import com.securevault.backend.security.overview.RiskAnalyzer;

@Service
public class SecurityOverviewService {

    @Autowired
    private VaultRepository vaultRepository;

    @Autowired
    private PasswordAnalyzer passwordAnalyzer;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private SecurityScoreCalculator securityScoreCalculator;

    @Autowired
    private RiskAnalyzer riskAnalyzer;

    public SecurityOverviewResponse getOverview() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        List<VaultItem> vaultItems =
                vaultRepository.findByUserEmail(email);

        int totalAssets = vaultItems.size();

        int totalFiles =
                (int) vaultRepository
                        .countByUserEmailAndEncryptedFileIsNotNull(email);

        int passwordCount =
                (int) vaultRepository
                        .countByUserEmailAndType(email, "PASSWORD");

        int apiKeyCount =
                (int) vaultRepository
                        .countByUserEmailAndType(email, "API_KEY");

        int noteCount =
                (int) vaultRepository
                        .countByUserEmailAndType(email, "NOTE");

        int weakPasswords =
                passwordAnalyzer.countWeakPasswords(vaultItems);

        int reusedPasswords =
                passwordAnalyzer.countReusedPasswords(vaultItems);

        int oldPasswords =
                passwordAnalyzer.countOldPasswords(vaultItems);

        int securityScore =
        securityScoreCalculator.calculate(
                weakPasswords,
                reusedPasswords,
                oldPasswords
        );

        SecurityOverviewResponse response =
                new SecurityOverviewResponse();

        response.setSecurityScore(securityScore);

        response.setTotalAssets(totalAssets);

        response.setTotalFiles(totalFiles);

        response.setPasswordCount(passwordCount);

        response.setApiKeyCount(apiKeyCount);

        response.setNoteCount(noteCount);

        response.setWeakPasswords(weakPasswords);

        response.setReusedPasswords(reusedPasswords);

        response.setOldPasswords(oldPasswords);

        List<SecurityActivity> activities =
                activityService
                        .getRecentActivities(email)
                        .stream()
                        .map(activity ->
                                new SecurityActivity(
                                        activity.getTitle(),
                                        activity.getDescription(),
                                        activity.getCreatedAt().toString()
                                )
                        )
                        .toList();

        response.setActivities(activities);

        List<SecurityRecommendation> recommendations = new ArrayList<>();

        if (weakPasswords > 0) {
                recommendations.add(
                        new SecurityRecommendation(
                                "Replace weak passwords",
                                "High"
                        )
                );
        }

        if (reusedPasswords > 0) {
                recommendations.add(
                        new SecurityRecommendation(
                                "Stop reusing passwords",
                                "High"
                        )
                );
        }

        if (oldPasswords > 0) {
                recommendations.add(
                        new SecurityRecommendation(
                                "Rotate passwords older than 180 days",
                                "Medium"
                        )
                );
        }

        if (passwordCount == 0) {
                recommendations.add(
                        new SecurityRecommendation(
                                "Store passwords securely inside SecureVault",
                                "Low"
                        )
                );
        }

        recommendations.add(
                new SecurityRecommendation(
                        "Enable Two-Factor Authentication",
                        "Medium"
                )
        );

        response.setRecommendations(recommendations);

        response.setRisks(

                riskAnalyzer.analyze(

                        weakPasswords,
                        reusedPasswords,
                        oldPasswords
                )
                
        );
        System.out.println("Weak = " + weakPasswords);
System.out.println("Reused = " + reusedPasswords);
System.out.println("Old = " + oldPasswords);
        return response;
}
}