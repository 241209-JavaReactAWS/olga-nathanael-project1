package com.revature.happyfarmersmarket.model;

public record PasswordResetRequest(String securityAnswer, String newPassword) {}
