package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.ThemeDto;
import com.openclassrooms.mddapi.services.interfaces.ThemeServiceInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/themes")
public class ThemeController {

    private final ThemeServiceInterface themeService;

    public ThemeController(ThemeServiceInterface themeService) {
        this.themeService = themeService;
    }

    @GetMapping
    public ResponseEntity<List<ThemeDto>> getAllThemes() {
        List<ThemeDto> themes = themeService.getAllThemes();
        return ResponseEntity.ok(themes);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ThemeDto>> getThemesByUserId(@PathVariable Integer userId) {
        List<ThemeDto> themes = themeService.getThemesByUserId(userId);
        return ResponseEntity.ok(themes);
    }
}