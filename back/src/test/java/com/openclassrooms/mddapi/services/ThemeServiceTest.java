package com.openclassrooms.mddapi.services;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.openclassrooms.mddapi.dto.ThemeDto;
import com.openclassrooms.mddapi.entities.Abonnement;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.mappers.ThemeMapper;
import com.openclassrooms.mddapi.repositories.AbonnementRepository;
import com.openclassrooms.mddapi.repositories.ThemeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

public class ThemeServiceTest {

    @Mock
    private ThemeRepository themeRepository;

    @Mock
    private AbonnementRepository abonnementRepository;

    @Mock
    private ThemeMapper themeMapper;

    @InjectMocks
    private ThemeService themeService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllThemes() {
        // Arrange
        Theme theme = new Theme();
        theme.setId(1);
        when(themeRepository.findAll()).thenReturn(List.of(theme));
        ThemeDto themeDto = new ThemeDto();
        themeDto.setId(1);
        when(themeMapper.toDTO(theme)).thenReturn(themeDto);

        // Act
        List<ThemeDto> result = themeService.getAllThemes();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(themeDto, result.get(0));
    }

    @Test
    public void testGetThemesByUserId() {
        // Arrange
        Integer userId = 1;
        Abonnement abonnement = new Abonnement();
        Theme theme = new Theme();
        theme.setId(1);
        abonnement.setTheme(theme);
        when(abonnementRepository.findByUserId(userId)).thenReturn(List.of(abonnement));
        ThemeDto themeDto = new ThemeDto();
        themeDto.setId(1);
        when(themeMapper.toDTO(theme)).thenReturn(themeDto);

        // Act
        List<ThemeDto> result = themeService.getThemesByUserId(userId);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(themeDto, result.get(0));
    }
}