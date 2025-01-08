package com.openclassrooms.mddapi.services.interfaces;

import com.openclassrooms.mddapi.dto.ThemeDto;

import java.util.List;

public interface ThemeServiceInterface {

    /**
     * Get all themes.
     *
     * @return a list of all themes
     */
    List<ThemeDto> getAllThemes();

    /**
     * Get all themes subscribed by a specific user.
     *
     * @param userId the ID of the user
     * @return a list of themes subscribed by the specified user
     */
    List<ThemeDto> getThemesByUserId(Integer userId);
}