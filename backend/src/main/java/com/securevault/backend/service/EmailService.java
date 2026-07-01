package com.securevault.backend.service;

import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${resend.api.key}")
    private String apiKey;

    public void sendOtp(
            String email,
            String otp
    ) {

        try {

            Resend resend =
                    new Resend(apiKey);

            CreateEmailOptions params =
                    CreateEmailOptions.builder()
                            .from("onboarding@resend.dev")
                            .to(email)
                            .subject(
                                    "SecureVault OTP Verification"
                            )
                            .html(
                                    "<h2>Your OTP is: "
                                            + otp +
                                            "</h2>"
                            )
                            .build();
            System.out.println("Sending OTP to: " + email);
            resend.emails().send(params);

            System.out.println(
                    "OTP sent successfully"
            );

        } catch (Exception e) {

            System.out.println("EMAIL ERROR:");

            e.printStackTrace();

            throw new RuntimeException(e);
        }
    }

    public void sendPasswordResetEmail(
        String email,
        String resetLink
    ) {

    try {

        Resend resend = new Resend(apiKey);

        CreateEmailOptions params =
                CreateEmailOptions.builder()
                        .from("onboarding@resend.dev")
                        .to(email)
                        .subject("Reset your SecureVault password")
                        .html("""
                                <h2>Password Reset</h2>

                                <p>You requested to reset your password.</p>

                                <a href="%s">
                                    Reset Password
                                </a>

                                <p>This link expires in 15 minutes.</p>
                                """.formatted(resetLink))
                        .build();

        resend.emails().send(params);

    } catch (Exception e) {

        throw new RuntimeException(e);

    }

   }
}