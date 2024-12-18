package com.revature.happyfarmersmarket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "security_questions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SecurityQuestion {
    @Id
    private Integer id;
    private String securityQuestion;
}