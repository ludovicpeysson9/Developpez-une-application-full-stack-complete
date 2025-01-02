package com.openclassrooms.mddapi.services.interfaces;

public interface UserSecurityServiceInterface {
    boolean isOwner(Integer userId);
}