package com.revature.happyfarmersmarket.service;

import com.revature.happyfarmersmarket.model.JwtToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
public class JwtService {
    private final SecretKey secretKey;
    private final JwtParser jwtParser;

    public JwtService(SecretKey secretKey) {
        this.secretKey = secretKey;
        this.jwtParser = Jwts.parser().verifyWith(secretKey).build();
    }

    public Optional<Claims> verifyToken(JwtToken token) {
        try {
            return Optional.of(this.jwtParser.parseSignedClaims(token.token()).getPayload());
        } catch (JwtException | IllegalArgumentException e) {
            return Optional.empty();
        }
    }

    public JwtToken generateToken(String subject, String role) {
        return this.generateToken(subject, Map.of("role", role));
    }

    private JwtToken generateToken(String subject, Map<String, ?> claims) {
        return new JwtToken(Jwts.builder()
                .subject(subject)
                .claims(claims)
                .issuer("Happy Farmers Market")
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusSeconds(86_400)))
                .signWith(this.secretKey)
                .compact());
    }


    // Extract username from the token
    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    // Extract roles or other claims from the token
    public String getRolesFromToken(String token) {
        return getClaimsFromToken(token).get("roles", String.class); // Assuming "roles" is a claim
    }

    // Validate the token
    public boolean validateToken(String token) {
        try {
            getClaimsFromToken(token); // Check if token can be parsed
            return true;
        } catch (Exception e) {
            return false; // Invalid token
        }
    }

    // Extract Claims from token
    private Claims getClaimsFromToken(String token) {
        try {
            return this.jwtParser.parseSignedClaims(token).getPayload();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse JWT token: " + e.getMessage(), e);
        }
    }
}
