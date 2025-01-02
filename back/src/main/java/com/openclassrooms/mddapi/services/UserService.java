package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.dto.UserUpdateRequest;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.mappers.UserMapper;
import com.openclassrooms.mddapi.repositories.UserRepository;
import com.openclassrooms.mddapi.services.interfaces.UserServiceInterface;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceInterface {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return UserMapper.toDto(user);
    }

    @Override
    public UserDto updateUser(Integer id, UserUpdateRequest userUpdateRequest) {
        System.out.println("Finding user by ID: " + id);
        User user = findUserById(id);
        System.out.println("User found: " + user);
        updateUsername(user, userUpdateRequest.getUsername());
        updateEmail(user, userUpdateRequest.getEmail());
        System.out.println("Saving updated user: " + user);
        userRepository.save(user);
        return UserMapper.toDto(user);
    }

    private User findUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    private void updateUsername(User user, String username) {
        System.out.println("updateUsername with parameters : " + username);
        if (username != null && !username.isEmpty()) {
            System.out.println("Updating username to: " + username);
            user.setUsername(username);
        }
    }

    private void updateEmail(User user, String email) {
        System.out.println("updateUsername with parameters : " + email);
        if (email != null && !email.isEmpty()) {
            System.out.println("Updating email to: " + email);
            user.setEmail(email);
        }
    }
}