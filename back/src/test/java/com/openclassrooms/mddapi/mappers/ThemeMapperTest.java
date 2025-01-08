package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.ThemeDto;
import com.openclassrooms.mddapi.entities.Theme;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ThemeMapperTest {

    private ThemeMapper themeMapper;

    @BeforeEach
    public void setUp() {
        themeMapper = new ThemeMapper();
    }

    @Test
    public void testToDTO() {
        // Arrange
        Theme theme = new Theme();
        theme.setId(1);
        theme.setTitle("title");
        theme.setContent("content");

        // Act
        ThemeDto themeDto = themeMapper.toDTO(theme);

        // Assert
        assertNotNull(themeDto);
        assertEquals(theme.getId(), themeDto.getId());
        assertEquals(theme.getTitle(), themeDto.getTitle());
        assertEquals(theme.getContent(), themeDto.getContent());
    }
}