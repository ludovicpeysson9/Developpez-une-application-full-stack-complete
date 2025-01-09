package com.openclassrooms.mddapi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex, WebRequest request) {
        return new ResponseEntity<>("An error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UsernameNotFoundException ex, WebRequest request) {
        return new ResponseEntity<>("User not found: " + ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        return new ResponseEntity<>("Resource not found: " + ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ArticleCreationException.class)
    public ResponseEntity<String> handleArticleCreationException(ArticleCreationException ex, WebRequest request) {
        return new ResponseEntity<>("Article creation error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException ex, WebRequest request) {
        return new ResponseEntity<>("Authentication error: " + ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(RegistrationException.class)
    public ResponseEntity<String> handleRegistrationException(RegistrationException ex, WebRequest request) {
        return new ResponseEntity<>("Registration error: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CommentCreationException.class)
    public ResponseEntity<String> handleCommentCreationException(CommentCreationException ex, WebRequest request) {
        return new ResponseEntity<>("Comment creation error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(SubscriptionException.class)
    public ResponseEntity<String> handleSubscriptionException(SubscriptionException ex, WebRequest request) {
        return new ResponseEntity<>("Subscription error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ThemeNotFoundException.class)
    public ResponseEntity<String> handleThemeNotFoundException(ThemeNotFoundException ex, WebRequest request) {
        return new ResponseEntity<>("Theme not found: " + ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex, WebRequest request) {
        return new ResponseEntity<>("User not found: " + ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserUpdateException.class)
    public ResponseEntity<String> handleUserUpdateException(UserUpdateException ex, WebRequest request) {
        return new ResponseEntity<>("User update error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<String> handleServiceException(ServiceException ex, WebRequest request) {
        return new ResponseEntity<>("Service error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}