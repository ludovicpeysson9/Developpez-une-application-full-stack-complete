package com.openclassrooms.mddapi.exceptions;

public class RegistrationException extends RuntimeException {
    public RegistrationException(String message) {
        super(message);
    }
}