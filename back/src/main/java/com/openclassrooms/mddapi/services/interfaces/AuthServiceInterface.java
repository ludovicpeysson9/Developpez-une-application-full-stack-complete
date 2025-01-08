package com.openclassrooms.mddapi.services.interfaces;

import com.openclassrooms.mddapi.dto.AuthResponse;
import com.openclassrooms.mddapi.dto.LoginRequest;
import com.openclassrooms.mddapi.dto.RegisterRequest;

public interface AuthServiceInterface {

    /**
     * Authenticate a user and return a JWT token.
     *
     * @param loginRequest the login request containing the user's credentials
     * @return the authentication response containing the JWT token
     */
    AuthResponse login(LoginRequest loginRequest);

    /**
     * Register a new user and return a JWT token.
     *
     * @param registerRequest the registration request containing the user's details
     * @return the authentication response containing the JWT token
     */
    AuthResponse register(RegisterRequest registerRequest);
}