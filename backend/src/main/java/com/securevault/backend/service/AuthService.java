package com.securevault.backend.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.securevault.backend.dto.AuthResponse;
import com.securevault.backend.dto.PasswordRequest;
import com.securevault.backend.dto.RegisterRequest;
import com.securevault.backend.model.User;
import com.securevault.backend.repository.UserRepository;
import com.securevault.backend.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuditService auditService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ActivityService activityService;

    // ========================= REGISTER =========================

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()) != null) {
            return "Email already exists";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        String encodedPassword =
                passwordEncoder.encode(request.getPassword());
        user.setPassword(encodedPassword);
        user.getPasswordHistory().add(encodedPassword);

        String otp = String.valueOf(
                100000 + new Random().nextInt(900000)
        );

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
        user.setVerified(false);

        userRepository.save(user);

        // SECURITY ACTIVITY
        activityService.log(
                user.getEmail(),
                "Account Created",
                "Welcome to SecureVault"
        );

        try {

            emailService.sendOtp(
                    user.getEmail(),
                    otp
            );

        } catch (Exception e) {

            e.printStackTrace();
            return "EMAIL ERROR: " + e.getMessage();
        }

        // AUDIT LOG
        auditService.log(
                user.getEmail(),
                "REGISTER"
        );

        return "Verify Email";
    }

    // ========================= LOGIN =========================

    public AuthResponse login(String email, String password) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return new AuthResponse(
                    null,
                    "User not found"
            );
        }

        if (!user.isVerified()) {

            return new AuthResponse(
                    null,
                    "Please verify your email first"
            );
        }

        if (!passwordEncoder.matches(
                password,
                user.getPassword()
        )) {

            return new AuthResponse(
                    null,
                    "Invalid password"
            );
        }

        auditService.log(
                user.getEmail(),
                "LOGIN"
        );

        activityService.log(
                user.getEmail(),
                "Login",
                "Signed into SecureVault"
        );

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getName()
        );

        return new AuthResponse(
                token,
                "Login successful"
        );
    }

    // ========================= CHANGE PASSWORD =========================

    public String changePassword(
        String email,
        PasswordRequest req
    ) {

    User user = userRepository.findByEmail(email);

        if (user == null) {
                return "User not found";
        }

        if (!passwordEncoder.matches(
            req.getOldPassword(),
            user.getPassword()
        )) {

                return "Old password is incorrect";
        }

        if (passwordEncoder.matches(
            req.getNewPassword(),
            user.getPassword()
        )) {

                return "New password cannot be same as current password";
        }

        if (user.getPasswordHistory() != null) {

                for (String oldHash : user.getPasswordHistory()) {

                if (passwordEncoder.matches(
                    req.getNewPassword(),
                    oldHash
                )) {

                        return "You cannot reuse an old password";
                }
        }
    }

        String encodedNewPassword =
            passwordEncoder.encode(req.getNewPassword());

        user.setPassword(encodedNewPassword);

        user.getPasswordHistory().add(encodedNewPassword);

    // Keep only last 5 passwords

        if (user.getPasswordHistory().size() > 5) {

                user.getPasswordHistory().remove(0);
        }

        userRepository.save(user);

        auditService.log(
            user.getEmail(),
            "PASSWORD_CHANGE"
        );

        activityService.log(
            user.getEmail(),
            "Password Changed",
            "Your vault password was updated"
        );

        return "Password updated successfully";
    }

    // ========================= VERIFY OTP =========================

    public String verifyOtp(
            String email,
            String otp
    ) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return "User not found";
        }

        if (user.getOtp() == null) {
            return "OTP not found";
        }

        if (!user.getOtp().equals(otp)) {
            return "Invalid OTP";
        }

        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            return "OTP expired";
        }

        user.setVerified(true);
        user.setOtp(null);
        user.setOtpExpiry(null);

        userRepository.save(user);

        activityService.log(
                user.getEmail(),
                "Email Verified",
                "Account successfully verified"
        );

        return "Email verified successfully";
    }

    // ========================= RESEND OTP =========================

    public String resendOtp(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
                return "User not found";
        }

        String otp = String.valueOf(
                100000 + new Random().nextInt(900000)
        );

        user.setOtp(otp);
        user.setOtpExpiry(
                LocalDateTime.now().plusMinutes(10)
        );

        userRepository.save(user);

        emailService.sendOtp(
                user.getEmail(),
                otp
        );

        return "OTP sent";
    }

// ========================= FORGOT PASSWORD =========================

    public String forgotPassword(String email) {

        User user = userRepository.findByEmail(email);

    // Do not reveal whether the email exists
        if (user == null) {
                return "If an account exists, a reset link has been sent.";
        }

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getName()
        );

        String resetLink =
                "http://localhost:3000/reset-password?token=" + token;

        emailService.sendPasswordResetEmail(
                user.getEmail(),
                resetLink
        );

        auditService.log(
                user.getEmail(),
                "FORGOT_PASSWORD"
        );

        activityService.log(
                user.getEmail(),
                "Password Reset Requested",
                "Password reset link sent via email"
        );

        return "Reset link sent successfully.";
    }

// ========================= RESET PASSWORD =========================

        public String resetPassword(
                String token,
                String newPassword
        ) {

        try {

                String email = jwtUtil.extractEmail(token);

                User user = userRepository.findByEmail(email);

                if (user == null) {
                        return "User not found";
                }

                user.setPassword(
                        passwordEncoder.encode(newPassword)
                );

                userRepository.save(user);

                auditService.log(
                        user.getEmail(),
                        "PASSWORD_RESET"
                );

                activityService.log(
                        user.getEmail(),
                        "Password Reset",
                        "Password successfully reset using email link"
                );

                return "Password reset successful";

        } catch (Exception e) {

                return "Reset link is invalid or expired";

        }
    }
}