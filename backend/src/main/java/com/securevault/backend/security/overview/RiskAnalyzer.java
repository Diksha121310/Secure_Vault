package com.securevault.backend.security.overview;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class RiskAnalyzer {

    public List<SecurityRisk> analyze(
            int weakPasswords,
            int reusedPasswords,
            int oldPasswords
    ) {

        List<SecurityRisk> risks = new ArrayList<>();

        if (weakPasswords > 0) {

            risks.add(
                    new SecurityRisk(
                            weakPasswords + " Weak Password(s)",
                            "High"
                    )
            );
        }

        if (reusedPasswords > 0) {

            risks.add(
                    new SecurityRisk(
                            reusedPasswords + " Reused Password(s)",
                            "Critical"
                    )
            );
        }

        if (oldPasswords > 0) {

            risks.add(
                    new SecurityRisk(
                            oldPasswords + " Old Password(s)",
                            "Medium"
                    )
            );
        }

        return risks;
    }
}