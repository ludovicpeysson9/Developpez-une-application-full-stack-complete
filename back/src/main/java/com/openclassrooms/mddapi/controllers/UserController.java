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

    @GetMapping("/getUserByEmail")
    public ResponseEntity<UserDto> getUserByEmail(@RequestBody EmailRequest emailRequest) {
        System.out.println("Endpoint hit with email: " + emailRequest.getEmail());
        UserDto userDto = userService.getUserByEmail(emailRequest.getEmail());
        if (userDto != null) {
            System.out.println("User found: " + userDto);
            return ResponseEntity.ok(userDto);
        } else {
            System.out.println("User not found with email: " + emailRequest.getEmail());
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Integer id, @RequestBody UserUpdateRequest userUpdateRequest) {
        System.out.println("Update request received for user ID: " + id);
        if (!userSecurityService.isOwner(id)) {
            System.out.println("User is not the owner, access denied.");
            return ResponseEntity.status(403).build();
        }
        UserDto updatedUser = userService.updateUser(id, userUpdateRequest);
        System.out.println("User updated: " + updatedUser);
        return ResponseEntity.ok(updatedUser);
    }
}