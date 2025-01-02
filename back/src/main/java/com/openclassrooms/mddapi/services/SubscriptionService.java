package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.SubscriptionRequest;
import com.openclassrooms.mddapi.entities.Abonnement;
import com.openclassrooms.mddapi.entities.AbonnementId;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.AbonnementRepository;
import com.openclassrooms.mddapi.repositories.ThemeRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import com.openclassrooms.mddapi.services.interfaces.SubscriptionServiceInterface;
import org.springframework.stereotype.Service;

@Service
public class SubscriptionService implements SubscriptionServiceInterface {

    private final AbonnementRepository abonnementRepository;
    private final UserRepository userRepository;
    private final ThemeRepository themeRepository;

    public SubscriptionService(AbonnementRepository abonnementRepository, UserRepository userRepository, ThemeRepository themeRepository) {
        this.abonnementRepository = abonnementRepository;
        this.userRepository = userRepository;
        this.themeRepository = themeRepository;
    }

    @Override
    public void subscribe(SubscriptionRequest subscriptionRequest) {
        User user = findUserById(subscriptionRequest.getUserId());
        Theme theme = findThemeById(subscriptionRequest.getThemeId());

        Abonnement abonnement = new Abonnement();
        abonnement.setId(new AbonnementId(subscriptionRequest.getUserId(), subscriptionRequest.getThemeId()));
        abonnement.setUser(user);
        abonnement.setTheme(theme);
        abonnementRepository.save(abonnement);
    }

    @Override
    public void unsubscribe(SubscriptionRequest subscriptionRequest) {
        AbonnementId abonnementId = new AbonnementId(subscriptionRequest.getUserId(), subscriptionRequest.getThemeId());
        abonnementRepository.deleteById(abonnementId);
    }

    private User findUserById(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    private Theme findThemeById(Integer themeId) {
        return themeRepository.findById(themeId)
                .orElseThrow(() -> new IllegalArgumentException("Theme not found"));
    }
}