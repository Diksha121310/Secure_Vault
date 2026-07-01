package com.securevault.backend.security.overview;

import org.springframework.stereotype.Component;

@Component
public class SecurityScoreCalculator {

    public int calculate(
            int weakPasswords,
            int reusedPasswords,
            int oldPasswords
    ) {

        int score = 100;

        score -= weakPasswords * 5;
        score -= reusedPasswords * 10;
        score -= oldPasswords * 3;

        if (score < 0)
            score = 0;

        return score;
    }
}