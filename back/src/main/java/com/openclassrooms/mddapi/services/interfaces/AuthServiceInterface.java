package com.openclassrooms.mddapi.services.interfaces;

import com.openclassrooms.mddapi.dto.LoginRequest;

public interface AuthServiceInterface {
    String login(LoginRequest loginRequest);
}