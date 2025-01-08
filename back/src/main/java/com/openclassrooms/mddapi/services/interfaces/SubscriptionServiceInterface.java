package com.openclassrooms.mddapi.services.interfaces;

import com.openclassrooms.mddapi.dto.SubscriptionRequest;

public interface SubscriptionServiceInterface {

    /**
     * Subscribe a user to a theme.
     *
     * @param subscriptionRequest the subscription request containing the user ID and theme ID
     */
    void subscribe(SubscriptionRequest subscriptionRequest);

    /**
     * Unsubscribe a user from a theme.
     *
     * @param subscriptionRequest the subscription request containing the user ID and theme ID
     */
    void unsubscribe(SubscriptionRequest subscriptionRequest);
}