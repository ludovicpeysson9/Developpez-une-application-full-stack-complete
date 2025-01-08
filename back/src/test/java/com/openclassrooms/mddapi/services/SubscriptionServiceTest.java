package com.openclassrooms.mddapi.services;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.openclassrooms.mddapi.dto.SubscriptionRequest;
import com.openclassrooms.mddapi.entities.Abonnement;
import com.openclassrooms.mddapi.entities.AbonnementId;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.AbonnementRepository;
import com.openclassrooms.mddapi.repositories.ThemeRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

public class SubscriptionServiceTest {

    @Mock
    private AbonnementRepository abonnementRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ThemeRepository themeRepository;

    @InjectMocks
    private SubscriptionService subscriptionService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSubscribe() {
        // Arrange
        SubscriptionRequest subscriptionRequest = new SubscriptionRequest();
        subscriptionRequest.setUserId(1);
        subscriptionRequest.setThemeId(1);

        User user = new User();
        user.setId(1);
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Theme theme = new Theme();
        theme.setId(1);
        when(themeRepository.findById(1)).thenReturn(Optional.of(theme));

        Abonnement abonnement = new Abonnement();
        abonnement.setId(new AbonnementId(1, 1));
        abonnement.setUser(user);
        abonnement.setTheme(theme);

        // Act
        subscriptionService.subscribe(subscriptionRequest);

        // Assert
        verify(abonnementRepository, times(1)).save(any(Abonnement.class));
    }

    @Test
    public void testUnsubscribe() {
        // Arrange
        SubscriptionRequest subscriptionRequest = new SubscriptionRequest();
        subscriptionRequest.setUserId(1);
        subscriptionRequest.setThemeId(1);

        AbonnementId abonnementId = new AbonnementId(1, 1);

        // Act
        subscriptionService.unsubscribe(subscriptionRequest);

        // Assert
        verify(abonnementRepository, times(1)).deleteById(abonnementId);
    }

    @Test
    public void testFindUserByIdUserNotFound() {
        // Arrange
        Integer userId = 1;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Act & Assert
        SubscriptionRequest subscriptionRequest = new SubscriptionRequest();
        subscriptionRequest.setUserId(userId);
        subscriptionRequest.setThemeId(1);
        assertThrows(IllegalArgumentException.class, () -> subscriptionService.subscribe(subscriptionRequest));
    }

    @Test
    public void testFindThemeByIdThemeNotFound() {
        // Arrange
        Integer themeId = 1;
        when(themeRepository.findById(themeId)).thenReturn(Optional.empty());

        // Act & Assert
        SubscriptionRequest subscriptionRequest = new SubscriptionRequest();
        subscriptionRequest.setUserId(1);
        subscriptionRequest.setThemeId(themeId);
        assertThrows(IllegalArgumentException.class, () -> subscriptionService.subscribe(subscriptionRequest));
    }
}