package com.openclassrooms.mddapi.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.CreateUserRequest;
import com.openclassrooms.mddapi.dto.EmailRequest;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.services.interfaces.UserServiceInterface;

@RestController
public class UserController {

    private final UserServiceInterface userService;

    public UserController(UserServiceInterface userService) {
        this.userService = userService;
    }

    @GetMapping("/api/test/user")
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

    @PostMapping("/api/auth/createUser")
    public ResponseEntity<UserDto> createUser(@RequestBody CreateUserRequest createUserRequest) {
        System.out.println("Endpoint hit with request: " + createUserRequest);
        try {
            UserDto userDto = userService.createUser(createUserRequest);
            return ResponseEntity.ok(userDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}