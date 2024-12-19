package com.revature.happyfarmersmarket.interceptor;

import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;
import java.util.List;

public class UserDetails {

    // Getters and setters for user details
    @Setter
    @Getter
    private String username; // The unique username of the user (or ID if preferred)
    @Setter
    @Getter
    private String roles;    // The roles/permissions of the user in a comma-separated list (or use a List)
    private boolean isActive; // Optional: flag to indicate the account's status

    public UserDetails(String username, String roles) {
        this.username = username;
        this.roles = roles;
        this.isActive = true; // Default value; can use another claim from JWT to set
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    // Optionally, handle roles as a list
    public List<String> getRoleList() {
        return Arrays.asList(roles.split(","));
    }

    @Override
    public String toString() {
        return "UserDetails{" +
                "username='" + username + '\'' +
                ", roles='" + roles + '\'' +
                ", isActive=" + isActive +
                '}';
    }
}
