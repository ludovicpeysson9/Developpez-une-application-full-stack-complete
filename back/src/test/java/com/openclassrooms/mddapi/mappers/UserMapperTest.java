package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.CreateUserRequest;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

public class UserMapperTest {

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    public void testToEntity() {
        // Arrange
        CreateUserRequest createUserRequest = new CreateUserRequest();
        createUserRequest.setUsername("username");
        createUserRequest.setEmail("email@example.com");
        createUserRequest.setPassword("password");

        // Act
        User user = UserMapper.toEntity(createUserRequest);

        // Assert
        assertNotNull(user);
        assertEquals(createUserRequest.getUsername(), user.getUsername());
        assertEquals(createUserRequest.getEmail(), user.getEmail());
        assertTrue(passwordEncoder.matches(createUserRequest.getPassword(), user.getPassword()));
    }

    @Test
    public void testToDto() {
        // Arrange
        User user = new User();
        user.setId(1);
        user.setUsername("username");
        user.setEmail("email@example.com");

        // Act
        UserDto userDto = UserMapper.toDto(user);

        // Assert
        assertNotNull(userDto);
        assertEquals(user.getId(), userDto.getId());
        assertEquals(user.getUsername(), userDto.getUsername());
        assertEquals(user.getEmail(), userDto.getEmail());
    }
}