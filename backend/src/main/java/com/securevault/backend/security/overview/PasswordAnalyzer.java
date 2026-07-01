package com.securevault.backend.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.securevault.backend.model.VaultItem;
import com.securevault.backend.security.AESEncryption;

@Service
public class PasswordAnalyzer {

    public int countWeakPasswords(List<VaultItem> vaultItems) {

        int count = 0;

        for (VaultItem item : vaultItems) {

            if (!"PASSWORD".equals(item.getType()))
                continue;

            String password =
                    AESEncryption.decrypt(item.getEncryptedData());

            if (isWeak(password))
                count++;
        }

        return count;
    }

    public int countReusedPasswords(List<VaultItem> vaultItems) {

        Map<String, Integer> map = new HashMap<>();

        for (VaultItem item : vaultItems) {

            if (!"PASSWORD".equals(item.getType()))
                continue;

            String password =
                    AESEncryption.decrypt(item.getEncryptedData());

            map.put(
                    password,
                    map.getOrDefault(password, 0) + 1
            );
        }

        int reused = 0;

        for (Integer value : map.values()) {

            if (value > 1) {
                reused += value - 1;
            }
        }

        return reused;
    }

    public int countOldPasswords(List<VaultItem> vaultItems) {

        int count = 0;

        for (VaultItem item : vaultItems) {

            if (!"PASSWORD".equals(item.getType()))
                continue;

            if (item.getCreatedAt() == null)
                continue;

            long days =
                    ChronoUnit.DAYS.between(
                            item.getCreatedAt(),
                            LocalDateTime.now()
                    );

            if (days > 180)
                count++;
        }

        return count;
    }

    public int calculateSecurityScore(
            int weak,
            int reused,
            int old
    ) {

        int score = 100;

        score -= weak * 5;
        score -= reused * 10;
        score -= old * 2;

        if (score < 0)
            score = 0;

        if (score > 100)
            score = 100;

        return score;
    }

    private boolean isWeak(String password) {

        if (password == null)
            return true;

        if (password.length() < 12)
            return true;

        if (!password.matches(".*[A-Z].*"))
            return true;

        if (!password.matches(".*[a-z].*"))
            return true;

        if (!password.matches(".*\\d.*"))
            return true;

        if (!password.matches(".*[@#$%^&+=!].*"))
            return true;

        return false;
    }
}