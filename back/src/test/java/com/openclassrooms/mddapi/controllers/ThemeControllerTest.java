package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.ThemeDto;
import com.openclassrooms.mddapi.services.UserSecurityService;
import com.openclassrooms.mddapi.services.interfaces.ThemeServiceInterface;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
public class ThemeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ThemeServiceInterface themeService;

    @MockBean
    private UserSecurityService userSecurityService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        UserDetails userDetails = new User("user", "", Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
    public void testGetAllThemes() throws Exception {
        ThemeDto theme1 = new ThemeDto();
        theme1.setId(1);
        theme1.setTitle("Theme 1");
        theme1.setContent("Content 1");

        ThemeDto theme2 = new ThemeDto();
        theme2.setId(2);
        theme2.setTitle("Theme 2");
        theme2.setContent("Content 2");

        List<ThemeDto> themes = Arrays.asList(theme1, theme2);

        when(themeService.getAllThemes()).thenReturn(themes);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/themes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(theme1.getId()))
                .andExpect(jsonPath("$[0].title").value(theme1.getTitle()))
                .andExpect(jsonPath("$[0].content").value(theme1.getContent()))
                .andExpect(jsonPath("$[1].id").value(theme2.getId()))
                .andExpect(jsonPath("$[1].title").value(theme2.getTitle()))
                .andExpect(jsonPath("$[1].content").value(theme2.getContent()));
    }

    @Test
    public void testGetThemesByUserId() throws Exception {
        Integer userId = 1;

        ThemeDto theme1 = new ThemeDto();
        theme1.setId(1);
        theme1.setTitle("Theme 1");
        theme1.setContent("Content 1");

        ThemeDto theme2 = new ThemeDto();
        theme2.setId(2);
        theme2.setTitle("Theme 2");
        theme2.setContent("Content 2");

        List<ThemeDto> themes = Arrays.asList(theme1, theme2);

        when(userSecurityService.isOwner(userId)).thenReturn(true);
        when(themeService.getThemesByUserId(userId)).thenReturn(themes);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/themes/user/{userId}", userId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(theme1.getId()))
                .andExpect(jsonPath("$[0].title").value(theme1.getTitle()))
                .andExpect(jsonPath("$[0].content").value(theme1.getContent()))
                .andExpect(jsonPath("$[1].id").value(theme2.getId()))
                .andExpect(jsonPath("$[1].title").value(theme2.getTitle()))
                .andExpect(jsonPath("$[1].content").value(theme2.getContent()));
    }

    @Test
    public void testGetThemesByUserIdForbidden() throws Exception {
        Integer userId = 1;

        when(userSecurityService.isOwner(userId)).thenReturn(false);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/themes/user/{userId}", userId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }
}
