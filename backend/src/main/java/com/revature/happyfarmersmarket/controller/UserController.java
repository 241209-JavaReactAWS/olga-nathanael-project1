package com.revature.happyfarmersmarket.controller;

import com.revature.happyfarmersmarket.exception.RegistrationException;
import com.revature.happyfarmersmarket.model.*;
import com.revature.happyfarmersmarket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtToken> login(@RequestBody User user) {
        JwtToken token = this.userService.loginUser(user);
        if (token == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        else return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistration userRegistration) {
        Map<String, Object> response = new HashMap<>();
        try {
            User registeredUser = this.userService.registerUser(userRegistration);

            if (registeredUser != null) {
                response.put("success", true);
                response.put("message", "User registered successfully");
                response.put("data", registeredUser);

                return ResponseEntity.status(201).body(response);
            } else return ResponseEntity.internalServerError().build();
        } catch (RegistrationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/security-questions")
    public ResponseEntity<List<SecurityQuestion>> getSecurityQuestions() {
        return ResponseEntity.ok(this.userService.getSecurityQuestions());
    }

    @GetMapping("/reset-password/{username}")
    public ResponseEntity<String> resetPassword(@PathVariable String username) {
        Optional<String> securityQuestion = this.userService.getSecurityQuestion(username);
        return securityQuestion.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PostMapping("/reset-password/{username}")
    public ResponseEntity<?> resetPassword(@PathVariable String username, @RequestBody PasswordResetRequest passwordResetRequest) {
        boolean result = this.userService.resetPassword(username, passwordResetRequest.securityAnswer(), passwordResetRequest.newPassword());
        return result ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }
}
