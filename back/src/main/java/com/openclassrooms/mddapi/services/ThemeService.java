package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.ThemeDto;
import com.openclassrooms.mddapi.mappers.ThemeMapper;
import com.openclassrooms.mddapi.repositories.AbonnementRepository;
import com.openclassrooms.mddapi.repositories.ThemeRepository;
import com.openclassrooms.mddapi.services.interfaces.ThemeServiceInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThemeService implements ThemeServiceInterface {

    private final ThemeRepository themeRepository;
    private final AbonnementRepository abonnementRepository;
    private final ThemeMapper themeMapper;

    public ThemeService(ThemeRepository themeRepository, AbonnementRepository abonnementRepository,
            ThemeMapper themeMapper) {
        this.themeRepository = themeRepository;
        this.abonnementRepository = abonnementRepository;
        this.themeMapper = themeMapper;
    }

    @Override
    public List<ThemeDto> getAllThemes() {
        return themeRepository.findAll().stream()
                .map(themeMapper::toDTO)
                .toList();
    }

    @Override
    public List<ThemeDto> getThemesByUserId(Integer userId) {
        return abonnementRepository.findByUserId(userId).stream()
                .map(abonnement -> themeMapper.toDTO(abonnement.getTheme()))
                .toList();
    }
}