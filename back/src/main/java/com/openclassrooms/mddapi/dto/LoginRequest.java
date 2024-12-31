package com.openclassrooms.mddapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    private String identifier; // Peut être soit un nom d'utilisateur soit un email

    @NotBlank
    private String password;
}