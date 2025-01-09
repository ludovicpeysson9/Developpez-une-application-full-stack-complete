package com.openclassrooms.mddapi.exceptions;

public class CommentCreationException extends RuntimeException {
    public CommentCreationException(String message) {
        super(message);
    }
}