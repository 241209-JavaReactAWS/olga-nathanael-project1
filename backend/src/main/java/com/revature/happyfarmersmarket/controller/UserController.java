package com.revature.happyfarmersmarket.controller;

import com.revature.happyfarmersmarket.exception.RegistrationException;
import com.revature.happyfarmersmarket.model.JwtToken;
import com.revature.happyfarmersmarket.model.User;
import com.revature.happyfarmersmarket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController("/")
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

    @PostMapping("/api/v1/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            User registeredUser = this.userService.registerUser(user);

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

    // todo ask Bryan about registering Admin users
}
