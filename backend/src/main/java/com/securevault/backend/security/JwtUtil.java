package com.securevault.backend.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // 🔥 IMPORTANT: MUST be at least 32 bytes (you are OK now)
    private final String SECRET = "securevaultsecretkeysecurevaultsecretkey123456";

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String email, String name) {
        return Jwts.builder()
                .setSubject(email)
                .claim("name", name)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String generatePasswordResetToken(String email) {

        return Jwts.builder()
            .setSubject(email)
            .claim("type", "PASSWORD_RESET")
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }

    public boolean isPasswordResetToken(String token) {

        Claims claims = validateToken(token);

        return "PASSWORD_RESET".equals(claims.get("type"));
    }

    public String extractEmail(String token) {

        return validateToken(token).getSubject();

    }

}