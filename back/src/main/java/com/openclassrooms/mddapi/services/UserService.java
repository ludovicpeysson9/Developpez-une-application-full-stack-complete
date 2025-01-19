package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.dto.UserUpdateRequest;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.exceptions.ServiceException;
import com.openclassrooms.mddapi.mappers.UserMapper;
import com.openclassrooms.mddapi.repositories.UserRepository;
import com.openclassrooms.mddapi.services.interfaces.UserServiceInterface;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceInterface {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDto getUserByEmail(String email) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new ServiceException("User not found with email: " + email));
            return UserMapper.toDto(user);
        } catch (Exception e) {
            throw new ServiceException("Error retrieving user by email: " + e.getMessage());
        }
    }

    @Override
    public UserDto updateUser(Integer id, UserUpdateRequest userUpdateRequest) {
        try {
            User user = findUserById(id);
            updateUsername(user, userUpdateRequest.getUsername());
            updateEmail(user, userUpdateRequest.getEmail());
            updatePassword(user, userUpdateRequest.getPassword());
            userRepository.save(user);
            return UserMapper.toDto(user);
        } catch (Exception e) {
            throw new ServiceException("Error updating user: " + e.getMessage());
        }
    }

    private User findUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ServiceException("User not found with id: " + id));
    }

    private void updateUsername(User user, String username) {
        if (username != null && !username.isEmpty()) {
            System.out.println("Updating username to: " + username);
            user.setUsername(username);
        }
    }

    private void updateEmail(User user, String email) {
        if (email != null && !email.isEmpty()) {
            System.out.println("Updating email to: " + email);
            user.setEmail(email);
        }
    }

    private void updatePassword(User user, String password) {
        if (password != null && !password.isEmpty()) {
            if (isValidPassword(password)) {
                user.setPassword(passwordEncoder.encode(password));
            } else {
                throw new ServiceException("Password does not meet the required criteria");
            }
        }
    }

    private boolean isValidPassword(String password) {
        String passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        return Pattern.matches(passwordPattern, password);
    }
}