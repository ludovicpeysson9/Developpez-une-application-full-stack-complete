package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.UserRepository;
import com.openclassrooms.mddapi.services.interfaces.UserSecurityServiceInterface;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserSecurityService implements UserSecurityServiceInterface {

    private final UserRepository userRepository;

    public UserSecurityService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean isOwner(Integer userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getId().equals(userId);
    }
}