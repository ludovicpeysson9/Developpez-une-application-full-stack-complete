package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.ThemeDto;
import com.openclassrooms.mddapi.services.UserSecurityService;
import com.openclassrooms.mddapi.services.interfaces.ThemeServiceInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/themes")
public class ThemeController {

    private final ThemeServiceInterface themeService;
    private final UserSecurityService userSecurityService;

    public ThemeController(ThemeServiceInterface themeService, UserSecurityService userSecurityService) {
        this.themeService = themeService;
        this.userSecurityService = userSecurityService;
    }

    @GetMapping
    public ResponseEntity<List<ThemeDto>> getAllThemes() {
        List<ThemeDto> themes = themeService.getAllThemes();
        return ResponseEntity.ok(themes);
    }

    /*@GetMapping("/user/{userId}")
    public ResponseEntity<List<ThemeDto>> getThemesByUserId(@PathVariable Integer userId) {
        List<ThemeDto> themes = themeService.getThemesByUserId(userId);
        return ResponseEntity.ok(themes);
    }*/
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ThemeDto>> getThemesByUserId(@PathVariable Integer userId) {
        if (!userSecurityService.isOwner(userId)) {
            return ResponseEntity.status(403).build();
        }
        List<ThemeDto> themes = themeService.getThemesByUserId(userId);
        return ResponseEntity.ok(themes);
    }
}