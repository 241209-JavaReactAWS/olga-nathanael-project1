package com.revature.happyfarmersmarket.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String username;
    private String firstName;
    private String lastName;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String role;


    @ToString.Exclude
    @OneToOne(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE }, orphanRemoval = true)

    @ManyToOne
    @JsonIgnore
    private SecurityQuestion securityQuestion;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String securityAnswer;

    @OneToOne
    private Cart cart;
}
