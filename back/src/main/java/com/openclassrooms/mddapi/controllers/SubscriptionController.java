package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.SubscriptionRequest;
import com.openclassrooms.mddapi.exceptions.SubscriptionException;
import com.openclassrooms.mddapi.services.UserSecurityService;
import com.openclassrooms.mddapi.services.interfaces.SubscriptionServiceInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionServiceInterface subscriptionService;
    private final UserSecurityService userSecurityService;

    public SubscriptionController(SubscriptionServiceInterface subscriptionService, UserSecurityService userSecurityService) {
        this.subscriptionService = subscriptionService;
        this.userSecurityService = userSecurityService;
    }

    /**
     * Subscribe a user to a theme.
     *
     * @param subscriptionRequest the subscription request containing the user ID and theme ID
     * @return a response entity indicating the result of the operation
     */
    @PostMapping
    public ResponseEntity<Void> subscribe(@RequestBody SubscriptionRequest subscriptionRequest) {
        if (!userSecurityService.isOwner(subscriptionRequest.getUserId())) {
            return ResponseEntity.status(403).build();
        }
        try {
            subscriptionService.subscribe(subscriptionRequest);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            throw new SubscriptionException("Error during subscription: " + e.getMessage());
        }
    }

    /**
     * Unsubscribe a user from a theme.
     *
     * @param subscriptionRequest the subscription request containing the user ID and theme ID
     * @return a response entity indicating the result of the operation
     */
    @DeleteMapping
    public ResponseEntity<Void> unsubscribe(@RequestBody SubscriptionRequest subscriptionRequest) {
        if (!userSecurityService.isOwner(subscriptionRequest.getUserId())) {
            return ResponseEntity.status(403).build();
        }
        try {
            subscriptionService.unsubscribe(subscriptionRequest);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            throw new SubscriptionException("Error during unsubscription: " + e.getMessage());
        }
    }
}