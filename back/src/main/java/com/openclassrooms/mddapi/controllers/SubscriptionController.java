package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.SubscriptionRequest;
import com.openclassrooms.mddapi.services.interfaces.SubscriptionServiceInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionServiceInterface subscriptionService;

    public SubscriptionController(SubscriptionServiceInterface subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping
    public ResponseEntity<Void> subscribe(@RequestBody SubscriptionRequest subscriptionRequest) {
        subscriptionService.subscribe(subscriptionRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> unsubscribe(@RequestBody SubscriptionRequest subscriptionRequest) {
        subscriptionService.unsubscribe(subscriptionRequest);
        return ResponseEntity.ok().build();
    }
}