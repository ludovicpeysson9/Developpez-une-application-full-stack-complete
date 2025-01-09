package com.openclassrooms.mddapi.services;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.exceptions.ServiceException;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class UserSecurityServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private Authentication authentication;

    @Mock
    private SecurityContext securityContext;

    @InjectMocks
    private UserSecurityService userSecurityService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    public void testIsOwnerSuccess() {
        // Arrange
        Integer userId = 1;
        String currentUsername = "testUser";
        User user = new User();
        user.setId(userId);
        user.setUsername(currentUsername);

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(currentUsername);
        when(userRepository.findByUsername(currentUsername)).thenReturn(Optional.of(user));

        // Act
        boolean result = userSecurityService.isOwner(userId);

        // Assert
        assertTrue(result);
    }

    @Test
    public void testIsOwnerFailure() {
        // Arrange
        Integer userId = 1;
        String currentUsername = "testUser";
        User user = new User();
        user.setId(2); // Different user ID
        user.setUsername(currentUsername);

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(currentUsername);
        when(userRepository.findByUsername(currentUsername)).thenReturn(Optional.of(user));

        // Act
        boolean result = userSecurityService.isOwner(userId);

        // Assert
        assertFalse(result);
    }

    @Test
    public void testIsOwnerUserNotFound() {
        // Arrange
        Integer userId = 1;
        String currentUsername = "testUser";

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(currentUsername);
        when(userRepository.findByUsername(currentUsername)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ServiceException.class, () -> userSecurityService.isOwner(userId));
    }
}