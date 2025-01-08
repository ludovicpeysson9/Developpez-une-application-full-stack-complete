package com.openclassrooms.mddapi.services.interfaces;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.dto.UserUpdateRequest;

public interface UserServiceInterface {

    /**
     * Get a user by email.
     *
     * @param email the email of the user
     * @return the user with the specified email
     */
    UserDto getUserByEmail(String email);

    /**
     * Update a user.
     *
     * @param id the ID of the user
     * @param userUpdateRequest the user update request containing the updated user details
     * @return the updated user
     */
    UserDto updateUser(Integer id, UserUpdateRequest userUpdateRequest);
}
