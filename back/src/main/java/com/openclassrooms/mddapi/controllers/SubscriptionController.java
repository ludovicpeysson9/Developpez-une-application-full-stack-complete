package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.SubscriptionRequest;
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

    /*@PostMapping
    public ResponseEntity<Void> subscribe(@RequestBody SubscriptionRequest subscriptionRequest) {
        subscriptionService.subscribe(subscriptionRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> unsubscribe(@RequestBody SubscriptionRequest subscriptionRequest) {
        subscriptionService.unsubscribe(subscriptionRequest);
        return ResponseEntity.ok().build();
    }*/

    @PostMapping
    public ResponseEntity<Void> subscribe(@RequestBody SubscriptionRequest subscriptionRequest) {
        if (!userSecurityService.isOwner(subscriptionRequest.getUserId())) {
            return ResponseEntity.status(403).build();
        }
        subscriptionService.subscribe(subscriptionRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> unsubscribe(@RequestBody SubscriptionRequest subscriptionRequest) {
        if (!userSecurityService.isOwner(subscriptionRequest.getUserId())) {
            return ResponseEntity.status(403).build();
        }
        subscriptionService.unsubscribe(subscriptionRequest);
        return ResponseEntity.ok().build();
    }
}