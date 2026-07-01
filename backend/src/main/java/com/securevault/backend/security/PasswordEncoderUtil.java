package com.securevault.backend.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderUtil {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // hash raw password
    public static String hash(String password) {
        return encoder.encode(password);
    }

    // compare raw vs hashed
    public static boolean matches(String rawPassword, String hashedPassword) {
        return encoder.matches(rawPassword, hashedPassword);
    }
}