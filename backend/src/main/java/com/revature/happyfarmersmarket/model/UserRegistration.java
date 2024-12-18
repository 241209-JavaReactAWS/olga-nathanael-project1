package com.revature.happyfarmersmarket.model;

import lombok.Data;

@Data
public class UserRegistration {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private Integer securityQuestion;
    private String securityAnswer;
}
