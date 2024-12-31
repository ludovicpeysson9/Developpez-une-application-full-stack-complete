package com.openclassrooms.mddapi.services.interfaces;

import com.openclassrooms.mddapi.dto.CreateUserRequest;
import com.openclassrooms.mddapi.dto.UserDto;

public interface UserServiceInterface {
    UserDto getUserByEmail(String email);
    UserDto createUser(CreateUserRequest createUserRequest);
}
