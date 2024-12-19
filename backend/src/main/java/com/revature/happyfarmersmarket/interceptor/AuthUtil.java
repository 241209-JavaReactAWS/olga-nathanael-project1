package com.revature.happyfarmersmarket.interceptor;

import org.springframework.stereotype.Component;

import java.util.Optional;
@Component
public class AuthUtil {

    // ThreadLocal for storing user-specific data
    private static final ThreadLocal<UserDetails> loggedUser = new ThreadLocal<>();

    // Set the current logged-in user (called in the interceptor)
    public static void setLoggedUser(UserDetails user) {
        loggedUser.set(user);
    }

    // Get the current logged-in user
    public static UserDetails loggedUser() {
        UserDetails user = loggedUser.get();
        if (user == null) {
            throw new RuntimeException("No logged-in user found!"); // Handle appropriately
        }
        return user;
    }

    // Clear the ThreadLocal storage (to avoid memory leaks)
    public static void clear() {
        loggedUser.remove();
    }
}