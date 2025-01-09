package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.SubscriptionRequest;
import com.openclassrooms.mddapi.entities.Abonnement;
import com.openclassrooms.mddapi.entities.AbonnementId;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.exceptions.ServiceException;
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
        try {
            User user = findUserById(subscriptionRequest.getUserId());
            Theme theme = findThemeById(subscriptionRequest.getThemeId());

            Abonnement abonnement = new Abonnement();
            abonnement.setId(new AbonnementId(subscriptionRequest.getUserId(), subscriptionRequest.getThemeId()));
            abonnement.setUser(user);
            abonnement.setTheme(theme);
            abonnementRepository.save(abonnement);
        } catch (Exception e) {
            throw new ServiceException("Error during subscription: " + e.getMessage());
        }
    }

    @Override
    public void unsubscribe(SubscriptionRequest subscriptionRequest) {
        try {
            AbonnementId abonnementId = new AbonnementId(subscriptionRequest.getUserId(), subscriptionRequest.getThemeId());
            abonnementRepository.deleteById(abonnementId);
        } catch (Exception e) {
            throw new ServiceException("Error during unsubscription: " + e.getMessage());
        }
    }

    private User findUserById(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ServiceException("User not found with id: " + userId));
    }

    private Theme findThemeById(Integer themeId) {
        return themeRepository.findById(themeId)
                .orElseThrow(() -> new ServiceException("Theme not found with id: " + themeId));
    }
}