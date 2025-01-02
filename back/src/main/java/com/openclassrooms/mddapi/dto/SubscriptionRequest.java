package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class SubscriptionRequest {
    private Integer userId;
    private Integer themeId;
}