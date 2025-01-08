package com.openclassrooms.mddapi.services.interfaces;

public interface UserSecurityServiceInterface {

    /**
     * Check if the current user is the owner of the specified user ID.
     *
     * @param userId the ID of the user
     * @return true if the current user is the owner, false otherwise
     */
    boolean isOwner(Integer userId);
}