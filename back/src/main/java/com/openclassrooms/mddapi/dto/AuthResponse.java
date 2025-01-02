package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private Integer id;
    private String username;
    private String email;
    private String token;
}