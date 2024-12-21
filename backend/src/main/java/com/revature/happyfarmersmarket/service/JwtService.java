package com.revature.happyfarmersmarket.service;

import com.revature.happyfarmersmarket.model.JwtToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
public class JwtService {
    private static final Logger logger = LogManager.getLogger();

    private final SecretKey secretKey;
    private final JwtParser jwtParser;

    public JwtService(SecretKey secretKey) {
        this.secretKey = secretKey;
        this.jwtParser = Jwts.parser().verifyWith(secretKey).build();
    }

    public Optional<Claims> verifyToken(JwtToken token) {
        logger.info("Verifying authentication token..");
        try {
            Claims claims = this.jwtParser.parseSignedClaims(token.token()).getPayload();
            logger.info("Successfully verified authentication token.");
            return Optional.of(claims);
        } catch (JwtException | IllegalArgumentException e) {
            logger.error("Token failed verification with exception: {}", e.getMessage());
            logger.error(e);
            return Optional.empty();
        }
    }

    public JwtToken generateToken(String subject, String role) {
        logger.info("Generating new authentication token for user `{}` with role `{}`", subject, role);
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
}
