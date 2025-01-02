package com.openclassrooms.mddapi.services.interfaces;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.dto.UserUpdateRequest;

public interface UserServiceInterface {
    UserDto getUserByEmail(String email);
    UserDto updateUser(Integer id, UserUpdateRequest userUpdateRequest);
}
