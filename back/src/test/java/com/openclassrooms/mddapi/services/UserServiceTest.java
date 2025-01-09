package com.openclassrooms.mddapi.services;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.dto.UserUpdateRequest;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.exceptions.ServiceException;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetUserByEmailSuccess() {
        // Arrange
        String email = "test@example.com";
        User user = new User();
        user.setId(1);
        user.setEmail(email);
        user.setUsername("testUser");

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        UserDto userDto = new UserDto();
        userDto.setId(1);
        userDto.setEmail(email);
        userDto.setUsername("testUser");

        // Act
        UserDto result = userService.getUserByEmail(email);

        // Assert
        assertNotNull(result);
        assertEquals(userDto.getId(), result.getId());
        assertEquals(userDto.getEmail(), result.getEmail());
        assertEquals(userDto.getUsername(), result.getUsername());
    }

    @Test
    public void testGetUserByEmailNotFound() {
        // Arrange
        String email = "test@example.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ServiceException.class, () -> userService.getUserByEmail(email));
    }

    @Test
    public void testUpdateUserSuccess() {
        // Arrange
        Integer userId = 1;
        UserUpdateRequest userUpdateRequest = new UserUpdateRequest();
        userUpdateRequest.setUsername("newUsername");
        userUpdateRequest.setEmail("newEmail@example.com");

        User user = new User();
        user.setId(userId);
        user.setUsername("oldUsername");
        user.setEmail("oldEmail@example.com");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);

        UserDto userDto = new UserDto();
        userDto.setId(userId);
        userDto.setUsername("newUsername");
        userDto.setEmail("newEmail@example.com");

        // Act
        UserDto result = userService.updateUser(userId, userUpdateRequest);

        // Assert
        assertNotNull(result);
        assertEquals(userDto.getId(), result.getId());
        assertEquals(userDto.getUsername(), result.getUsername());
        assertEquals(userDto.getEmail(), result.getEmail());
    }

    @Test
    public void testUpdateUserNotFound() {
        // Arrange
        Integer userId = 1;
        UserUpdateRequest userUpdateRequest = new UserUpdateRequest();
        userUpdateRequest.setUsername("newUsername");
        userUpdateRequest.setEmail("newEmail@example.com");

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ServiceException.class, () -> userService.updateUser(userId, userUpdateRequest));
    }
}