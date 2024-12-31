package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.LoginRequest;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.UserRepository;
import com.openclassrooms.mddapi.services.interfaces.AuthServiceInterface;
import com.openclassrooms.mddapi.config.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements AuthServiceInterface {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public String login(LoginRequest loginRequest) {
        System.out.println("Login attempt with identifier: " + loginRequest.getIdentifier());
        User user = userRepository.findByUsername(loginRequest.getIdentifier());
        if (user == null) {
            System.out.println("User not found by username, trying email...");
            user = userRepository.findByEmail(loginRequest.getIdentifier());
        }
        if (user == null) {
            System.out.println("User not found by email either.");
            throw new IllegalArgumentException("Invalid username/email or password");
        }
        System.out.println("User found: " + user.getUsername());

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            System.out.println("Password does not match.");
            throw new IllegalArgumentException("Invalid username/email or password");
        }
        System.out.println("Password matches.");

        // Utilisation de AuthenticationManager pour authentifier l'utilisateur
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getIdentifier(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtils.generateJwtToken(user.getUsername(), user.getId());
        System.out.println("Generated token: " + token);
        return token;
    }
}