package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.SubscriptionRequest;
import com.openclassrooms.mddapi.services.UserSecurityService;
import com.openclassrooms.mddapi.services.interfaces.SubscriptionServiceInterface;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
public class SubscriptionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SubscriptionServiceInterface subscriptionService;

    @MockBean
    private UserSecurityService userSecurityService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        UserDetails userDetails = new User("user", "", Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
    public void testSubscribe() throws Exception {
        SubscriptionRequest subscriptionRequest = new SubscriptionRequest();
        subscriptionRequest.setUserId(1);
        subscriptionRequest.setThemeId(1);

        when(userSecurityService.isOwner(subscriptionRequest.getUserId())).thenReturn(true);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/subscriptions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(subscriptionRequest)))
                .andExpect(status().isOk());
    }

    @Test
    public void testSubscribeForbidden() throws Exception {
        SubscriptionRequest subscriptionRequest = new SubscriptionRequest();
        subscriptionRequest.setUserId(1);
        subscriptionRequest.setThemeId(1);

        when(userSecurityService.isOwner(subscriptionRequest.getUserId())).thenReturn(false);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/subscriptions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(subscriptionRequest)))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testUnsubscribe() throws Exception {
        SubscriptionRequest subscriptionRequest = new SubscriptionRequest();
        subscriptionRequest.setUserId(1);
        subscriptionRequest.setThemeId(1);

        when(userSecurityService.isOwner(subscriptionRequest.getUserId())).thenReturn(true);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/subscriptions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(subscriptionRequest)))
                .andExpect(status().isOk());
    }

    @Test
    public void testUnsubscribeForbidden() throws Exception {
        SubscriptionRequest subscriptionRequest = new SubscriptionRequest();
        subscriptionRequest.setUserId(1);
        subscriptionRequest.setThemeId(1);

        when(userSecurityService.isOwner(subscriptionRequest.getUserId())).thenReturn(false);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/subscriptions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(subscriptionRequest)))
                .andExpect(status().isForbidden());
    }
}
