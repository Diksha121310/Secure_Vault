package com.securevault.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.securevault.backend.dto.AuthRequest;
import com.securevault.backend.dto.AuthResponse;
import com.securevault.backend.dto.PasswordRequest;
import com.securevault.backend.dto.RegisterRequest;
import com.securevault.backend.security.LoginRateLimiter;
import com.securevault.backend.service.AuthService;

import com.securevault.backend.dto.VerifyOtpRequest;
import java.util.Map;
import com.securevault.backend.dto.ResetPasswordRequest;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    @Autowired
    private LoginRateLimiter loginRateLimiter;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // REGISTER
    @PostMapping("/register")
    public String register(
            @Valid @RequestBody RegisterRequest request
    ) {

        return authService.register(request);
    }

    // LOGIN
    @PostMapping("/login")
    public AuthResponse login(
            @Valid @RequestBody AuthRequest request
    ) {

        String email = request.getEmail();

        if (!loginRateLimiter.allowRequest(email)) {

            return new AuthResponse(
                    null,
                    "Too many login attempts. Try again later."
            );
        }

        return authService.login(
                request.getEmail(),
                request.getPassword()
        );
    }

    // CHANGE PASSWORD
    @PutMapping("/change-password")
    public String changePassword(
            @RequestBody PasswordRequest req,
            HttpServletRequest request
    ) {

        String email =
                (String) request.getAttribute("email");

        if (email == null) {
            return "Unauthorized";
        }

        return authService.changePassword(
                email,
                req
        );
    }
    @PostMapping("/verify-otp")
    public String verifyOtp(
        @RequestBody VerifyOtpRequest request
    ) {

        return authService.verifyOtp(
            request.getEmail(),
            request.getOtp()
        );
    }

    @PostMapping("/resend-otp")
    public String resendOtp(
            @RequestParam String email
    ) {
        return authService.resendOtp(email);
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(
        @RequestBody Map<String, String> request
    ) {
        return authService.forgotPassword(
            request.get("email")
        );
    }

    @PostMapping("/reset-password")
    public String resetPassword(
        @RequestBody ResetPasswordRequest request
    ) {

        return authService.resetPassword(
            request.getToken(),
            request.getNewPassword()
        );
    }
}
