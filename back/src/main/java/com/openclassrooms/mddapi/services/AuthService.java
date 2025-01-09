package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.AuthResponse;
import com.openclassrooms.mddapi.dto.LoginRequest;
import com.openclassrooms.mddapi.dto.RegisterRequest;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.exceptions.AuthenticationException;
import com.openclassrooms.mddapi.exceptions.RegistrationException;
import com.openclassrooms.mddapi.repositories.UserRepository;
import com.openclassrooms.mddapi.security.CustomUserDetails;
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
    public AuthResponse login(LoginRequest loginRequest) {
        try {
            User user = findUserByIdentifier(loginRequest.getIdentifier());
            validatePassword(loginRequest.getPassword(), user.getPassword());
            String token = authenticateUser(loginRequest.getIdentifier(), loginRequest.getPassword());
            return new AuthResponse(user.getId(), user.getUsername(), user.getEmail(), token);
        } catch (Exception e) {
            throw new AuthenticationException("Error during authentication: " + e.getMessage());
        }
    }

    @Override
    public AuthResponse register(RegisterRequest registerRequest) {
        try {
            validateNewUser(registerRequest);
            User user = createUser(registerRequest);
            String token = jwtUtils.generateJwtToken(user.getId());
            return new AuthResponse(user.getId(), user.getUsername(), user.getEmail(), token);
        } catch (Exception e) {
            throw new RegistrationException("Error during registration: " + e.getMessage());
        }
    }

    private User findUserByIdentifier(String identifier) {
        return userRepository.findByUsername(identifier)
            .orElseGet(() -> userRepository.findByEmail(identifier)
                .orElseThrow(() -> new AuthenticationException("Invalid username/email or password")));
    }

    private void validatePassword(String rawPassword, String encodedPassword) {
        if (!passwordEncoder.matches(rawPassword, encodedPassword)) {
            throw new AuthenticationException("Invalid username/email or password");
        }
    }

    private String authenticateUser(String identifier, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(identifier, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return jwtUtils.generateJwtToken(userDetails.getId());
    }

    private void validateNewUser(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RegistrationException("Email already in use");
        }
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RegistrationException("Username already in use");
        }
    }

    private User createUser(RegisterRequest registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        return userRepository.save(user);
    }
}