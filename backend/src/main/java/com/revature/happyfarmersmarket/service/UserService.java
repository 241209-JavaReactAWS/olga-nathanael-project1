package com.revature.happyfarmersmarket.service;

import com.revature.happyfarmersmarket.dao.SecurityQuestionDAO;
import com.revature.happyfarmersmarket.dao.UserDAO;
import com.revature.happyfarmersmarket.exception.RegistrationException;
import com.revature.happyfarmersmarket.model.JwtToken;
import com.revature.happyfarmersmarket.model.SecurityQuestion;
import com.revature.happyfarmersmarket.model.User;
import com.revature.happyfarmersmarket.model.UserRegistration;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private static final Logger logger = LogManager.getLogger();
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserDAO userDAO;
    private final CartService cartService;
    private final SecurityQuestionDAO securityQuestionDAO;

    @Autowired
    public UserService(PasswordEncoder passwordEncoder, JwtService jwtService, UserDAO userDAO,
                       CartService cartService, SecurityQuestionDAO securityQuestionDAO) {
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userDAO = userDAO;
        this.cartService = cartService;
        this.securityQuestionDAO = securityQuestionDAO;
    }

    public User registerUser(UserRegistration userRegistration) throws RegistrationException {
        logger.info("Attempting to register new user...");
        if (userRegistration.getUsername() == null || userRegistration.getUsername().isBlank())
            throw new RegistrationException("Invalid username");
        if (userRegistration.getFirstName() == null || userRegistration.getFirstName().isBlank())
            throw new RegistrationException("Invalid first name");
        if (userRegistration.getLastName() == null || userRegistration.getLastName().isBlank())
            throw new RegistrationException("Invalid last name");
        if (userRegistration.getPassword() == null || userRegistration.getPassword().isBlank() || userRegistration.getPassword().length() < 6)
            throw new RegistrationException("Invalid password");
        if (userRegistration.getSecurityQuestion() == null)
            throw new RegistrationException("Security question must be provided");
        if (userRegistration.getSecurityAnswer() == null || userRegistration.getSecurityAnswer().isBlank())
            throw new RegistrationException("Security answer must be provided");

        Optional<User> existingUser = this.userDAO.findById(userRegistration.getUsername());
        if (existingUser.isPresent()) throw new RegistrationException("Username is already taken.");

        User newUser = new User();
        newUser.setFirstName(userRegistration.getFirstName());
        newUser.setLastName(userRegistration.getLastName());
        newUser.setUsername(userRegistration.getUsername());

        String hashedPassword = this.passwordEncoder.encode(userRegistration.getPassword());
        newUser.setPassword(hashedPassword);

        Optional<SecurityQuestion> securityQuestion = this.securityQuestionDAO.findById(userRegistration.getSecurityQuestion());
        newUser.setSecurityQuestion(securityQuestion.orElseThrow(() -> new RegistrationException("Invalid security question option")));

        String hashedSecurityAnswer = this.passwordEncoder.encode(userRegistration.getSecurityAnswer());
        newUser.setSecurityAnswer(hashedSecurityAnswer);

        newUser.setRole("customer"); // sets all roles to customer

        User registeredUser = this.userDAO.save(newUser);

        // creates a cart for the user upon registration
        this.cartService.createCart(registeredUser.getUsername());

        return registeredUser;
    }

    public JwtToken loginUser(User user) {
        logger.info("Attempting to log in user with username `{}`", user.getUsername());
        Optional<User> existingUserOptional = this.userDAO.findById(user.getUsername());
        if (existingUserOptional.isPresent()) {
            logger.info("User found.");
            User existingUser = existingUserOptional.get();
            if (this.passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                logger.info("Passwords matched!");
                return this.jwtService.generateToken(existingUser.getUsername(), existingUser.getRole());
            } else {
                logger.info("Passwords did not match.");
                return null;
            }
        } else {
            logger.info("Could not find user with the given username.");
            return null;
        }
    }

    public List<SecurityQuestion> getSecurityQuestions() {
        logger.info("Retrieving list of security questions.");
        return this.securityQuestionDAO.findAll();
    }

    public Optional<String> getSecurityQuestion(String username) {
        logger.info("Retrieving security question for user `{}`", username);
        Optional<User> user = this.userDAO.findById(username);
        return user.map(User::getSecurityQuestion)
                .map(SecurityQuestion::getSecurityQuestion);
    }

    public boolean resetPassword(String username, String securityAnswer, String newPassword) {
        logger.info("Resetting password for user: `{}`", username);

        Optional<User> optionalUser = this.userDAO.findById(username);

        if (optionalUser.isEmpty()) {
            logger.info("Password reset failed! Could not find user with the given username");
            return false;
        }

        User user = optionalUser.get();

        if (this.passwordEncoder.matches(securityAnswer, user.getSecurityAnswer())) {
            user.setPassword(this.passwordEncoder.encode(newPassword));
            this.userDAO.save(user);
            logger.info("Password reset succeeded!");
            return true;
        } else {
            logger.info("Password reset failed! Security answer did not match.");
            return false;
        }
    }
}
