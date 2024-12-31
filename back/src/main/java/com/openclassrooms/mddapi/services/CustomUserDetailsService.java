package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.UserRepository;
import com.openclassrooms.mddapi.services.interfaces.CustomUserDetailsServiceInterface;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements CustomUserDetailsServiceInterface {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(identifier);
        if (user == null) {
            user = userRepository.findByEmail(identifier);
        }
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username or email: " + identifier);
        }
        return createSpringUser(user);
    }

    /**
     * Converts a User model to a Spring Security UserDetails object.
     *
     * @param user The User entity to convert.
     * @return UserDetails object for authentication purposes.
     */
    private UserDetails createSpringUser(User user) {
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), // Utilisez le nom d'utilisateur pour l'authentification
                user.getPassword(),
                Collections.emptyList() // No authorities are assigned to the user.
        );
    }
}