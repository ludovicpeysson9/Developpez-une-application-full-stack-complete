package com.openclassrooms.mddapi.services.interfaces;

import com.openclassrooms.mddapi.dto.SubscriptionRequest;

public interface SubscriptionServiceInterface {
    void subscribe(SubscriptionRequest subscriptionRequest);
    void unsubscribe(SubscriptionRequest subscriptionRequest);
}