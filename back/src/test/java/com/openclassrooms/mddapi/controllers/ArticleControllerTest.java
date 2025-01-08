package com.openclassrooms.mddapi.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.services.ArticleService;
import com.openclassrooms.mddapi.services.CustomUserDetailsService;
import com.openclassrooms.mddapi.services.UserSecurityService;
import com.openclassrooms.mddapi.config.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc 
class ArticleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ArticleService articleService;

    @MockBean
    private UserSecurityService userSecurityService;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @MockBean
    private JwtUtils jwtUtils;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @WithMockUser(username = "user", roles = { "USER" })
    public void testGetAllArticles() throws Exception {
        // Arrange
        ArticleDto articleDto = new ArticleDto();
        articleDto.setId(1);
        when(articleService.getAllArticles()).thenReturn(List.of(articleDto));

        // Act & Assert
        mockMvc.perform(get("/api/articles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    @WithMockUser(username = "user", roles = { "USER" })
    public void testGetArticleById() throws Exception {
        // Arrange
        Integer articleId = 1;
        ArticleDto articleDto = new ArticleDto();
        articleDto.setId(articleId);
        when(articleService.getArticleById(articleId)).thenReturn(articleDto);

        // Act & Assert
        mockMvc.perform(get("/api/articles/{id}", articleId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(articleId));
    }

    @Test
    @WithMockUser(username="user", roles={"USER", "ADMIN"})  
    public void testCreateArticleSuccess() throws Exception {
        ArticleDto articleDto = new ArticleDto();
        articleDto.setId(1);
        articleDto.setAuthorId(1);
        articleDto.setThemeId(1);

        when(userSecurityService.isOwner(anyInt())).thenReturn(true);
        when(articleService.createArticle(any(ArticleDto.class))).thenReturn(articleDto);

        mockMvc.perform(post("/api/articles/createArticle")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(articleDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(articleDto.getId()));

        verify(userSecurityService).isOwner(articleDto.getAuthorId()); 
        verify(articleService).createArticle(any(ArticleDto.class)); 
    }


    @Test
    @WithMockUser(username = "user", roles = { "USER" })
    public void testCreateArticleForbidden() throws Exception {
        // Arrange
        ArticleDto articleDto = new ArticleDto();
        articleDto.setId(1);
        articleDto.setAuthorId(1);
        articleDto.setThemeId(1);
        when(userSecurityService.isOwner(1)).thenReturn(false);

        // Act & Assert
        mockMvc.perform(post("/api/articles/createArticle")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":1,\"authorId\":1,\"themeId\":1}"))
                .andExpect(status().isForbidden());
    }
}