package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.ThemeDto;
import com.openclassrooms.mddapi.entities.Theme;
import org.springframework.stereotype.Component;

@Component
public class ThemeMapper {
    public ThemeDto toDTO(Theme theme) {
        ThemeDto dto = new ThemeDto();
        dto.setId(theme.getId());
        dto.setTitle(theme.getTitle());
        dto.setContent(theme.getContent());
        return dto;
    }
}