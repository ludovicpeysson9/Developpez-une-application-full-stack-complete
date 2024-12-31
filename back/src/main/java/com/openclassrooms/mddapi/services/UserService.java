package com.openclassrooms.mddapi.services;

import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.dto.CreateUserRequest;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.mappers.UserMapper;
import com.openclassrooms.mddapi.repositories.UserRepository;
import com.openclassrooms.mddapi.services.interfaces.UserServiceInterface;

@Service
public class UserService implements UserServiceInterface {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Override
    public UserDto getUserByEmail(String email) {
        System.out.println("Service hit with email: " + email);
        User user = userRepository.findByEmail(email);
        if (user == null) {
            System.out.println("User not found in database for email: " + email);
            return null;
        }
        System.out.println("User found in database: " + user);
        return UserMapper.toDto(user);
    }

    @Override
    public UserDto createUser(CreateUserRequest createUserRequest) {
        if (userRepository.existsByEmail(createUserRequest.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }
        if (userRepository.existsByUsername(createUserRequest.getUsername())) {
            throw new IllegalArgumentException("Username already in use");
        }
        User user = UserMapper.toEntity(createUserRequest);
        user = userRepository.save(user);
        return UserMapper.toDto(user);
    }
}