package com.revature.happyfarmersmarket.service;

import com.revature.happyfarmersmarket.dao.UserDAO;
import com.revature.happyfarmersmarket.exception.RegistrationException;
import com.revature.happyfarmersmarket.model.JwtToken;
import com.revature.happyfarmersmarket.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserDAO userDAO;

    @Autowired
    public UserService(PasswordEncoder passwordEncoder, JwtService jwtService, UserDAO userDAO) {
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userDAO = userDAO;
    }

    public User registerUser(User newUser) throws RegistrationException {
        if (newUser.getUsername() == null || newUser.getUsername().isBlank())
            throw new RegistrationException("Invalid username");
        if (newUser.getFirstName() == null || newUser.getFirstName().isBlank())
            throw new RegistrationException("Invalid first name");
        if (newUser.getLastName() == null || newUser.getLastName().isBlank())
            throw new RegistrationException("Invalid last name");
        if (newUser.getPassword() == null || newUser.getPassword().isBlank() || newUser.getPassword().length() < 6)
            throw new RegistrationException("Invalid password");


        Optional<User> existingUser = this.userDAO.findById(newUser.getUsername());
        if (existingUser.isPresent()) throw new RegistrationException("Username is already taken.");

        String hashedPassword = this.passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(hashedPassword);

        newUser.setRole("customer"); // sets all roles to customer

        return this.userDAO.save(newUser);
    }

    public JwtToken loginUser(User user) {
        Optional<User> existingUserOptional = this.userDAO.findById(user.getUsername());
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            if (this.passwordEncoder.matches(user.getPassword(), existingUser.getPassword()))
                return this.jwtService.generateToken(existingUser.getUsername(), existingUser.getRole());
            else return null;
        } else return null;
    }
}
