package com.revature.happyfarmersmarket.configuration;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.crypto.SecretKey;

@Configuration
public class SecurityConfiguration {
    public final Environment env;

    @Autowired
    public SecurityConfiguration(Environment env) {
        this.env = env;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        Integer saltLength = this.env.getProperty("argon2.saltLength", Integer.class);
        Integer hashLength = this.env.getProperty("argon2.hashLength", Integer.class);
        Integer parallelism = this.env.getProperty("argon2.parallelism", Integer.class);
        Integer memory = this.env.getProperty("argon2.memory", Integer.class);
        Integer iterations = this.env.getProperty("argon2.iterations", Integer.class);
        return new Argon2PasswordEncoder(saltLength, hashLength, parallelism, memory, iterations);
    }

    @Bean
    public SecretKey secretKey() {
        return Jwts.SIG.HS256.key().build();
    }
}
