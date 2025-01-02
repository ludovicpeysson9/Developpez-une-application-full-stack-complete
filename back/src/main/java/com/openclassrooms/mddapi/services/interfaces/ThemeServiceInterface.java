package com.openclassrooms.mddapi.services.interfaces;

import com.openclassrooms.mddapi.dto.ThemeDto;

import java.util.List;

public interface ThemeServiceInterface {
    List<ThemeDto> getAllThemes();
    List<ThemeDto> getThemesByUserId(Integer userId);
}