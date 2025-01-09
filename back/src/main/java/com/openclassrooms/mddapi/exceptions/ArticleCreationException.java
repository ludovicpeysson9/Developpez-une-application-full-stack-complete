package com.openclassrooms.mddapi.exceptions;

public class ArticleCreationException extends RuntimeException {
    public ArticleCreationException(String message) {
        super(message);
    }
}