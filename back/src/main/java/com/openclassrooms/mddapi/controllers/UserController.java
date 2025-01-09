package com.openclassrooms.mddapi.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.EmailRequest;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.dto.UserUpdateRequest;
import com.openclassrooms.mddapi.exceptions.UserNotFoundException;
import com.openclassrooms.mddapi.exceptions.UserUpdateException;
import com.openclassrooms.mddapi.services.interfaces.UserSecurityServiceInterface;
import com.openclassrooms.mddapi.services.interfaces.UserServiceInterface;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserServiceInterface userService;
    private final UserSecurityServiceInterface userSecurityService;

    public UserController(UserServiceInterface userService, UserSecurityServiceInterface userSecurityService) {
        this.userService = userService;
        this.userSecurityService = userSecurityService;
    }

    /**
     * Get a user by email.
     *
     * @param emailRequest the email request containing the user's email
     * @return the user with the specified email
     */
    @GetMapping("/getUserByEmail")
    public ResponseEntity<UserDto> getUserByEmail(@RequestBody EmailRequest emailRequest) {
        UserDto userDto = userService.getUserByEmail(emailRequest.getEmail());
        if (userDto != null) {
            return ResponseEntity.ok(userDto);
        } else {
            throw new UserNotFoundException("User not found with email: " + emailRequest.getEmail());
        }
    }

    /**
     * Update a user.
     *
     * @param id the ID of the user
     * @param userUpdateRequest the user update request containing the updated user details
     * @return the updated user
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Integer id, @RequestBody UserUpdateRequest userUpdateRequest) {
        if (!userSecurityService.isOwner(id)) {
            return ResponseEntity.status(403).build();
        }
        try {
            UserDto updatedUser = userService.updateUser(id, userUpdateRequest);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            throw new UserUpdateException("Error updating user: " + e.getMessage());
        }
    }
}