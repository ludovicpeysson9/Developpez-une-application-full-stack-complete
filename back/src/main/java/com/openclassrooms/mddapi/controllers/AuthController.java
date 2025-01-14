package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.AuthResponse;
import com.openclassrooms.mddapi.dto.LoginRequest;
import com.openclassrooms.mddapi.dto.RegisterRequest;
import com.openclassrooms.mddapi.exceptions.AuthenticationException;
import com.openclassrooms.mddapi.exceptions.RegistrationException;
import com.openclassrooms.mddapi.services.interfaces.AuthServiceInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthServiceInterface authService;

    public AuthController(AuthServiceInterface authService) {
        this.authService = authService;
    }

    /**
     * Authenticate a user and return a JWT token.
     *
     * @param loginRequest the login request containing the user's credentials
     * @return the authentication response containing the JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            AuthResponse response = authService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new AuthenticationException("Error during authentication: " + e.getMessage());
        }
    }

    /**
     * Register a new user and return a JWT token.
     *
     * @param registerRequest the registration request containing the user's details
     * @return the authentication response containing the JWT token
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        try {
            AuthResponse response = authService.register(registerRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RegistrationException("Error during registration: " + e.getMessage());
        }
    }

}