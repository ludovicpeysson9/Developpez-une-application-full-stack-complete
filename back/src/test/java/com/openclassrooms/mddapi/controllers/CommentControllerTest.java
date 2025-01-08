package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.services.interfaces.CommentServiceInterface;
import com.openclassrooms.mddapi.config.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
public class CommentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommentServiceInterface commentService;

    @MockBean
    private JwtUtils jwtUtils;

    @Autowired
    private ObjectMapper objectMapper;

    private String token;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        // Simuler un token JWT valide
        token = "Bearer " + "mockedToken";
        when(jwtUtils.validateJwtToken("mockedToken")).thenReturn(true);
        when(jwtUtils.getUserIdFromJwtToken("mockedToken")).thenReturn(1);

        UserDetails userDetails = new User("user", "", Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
    public void testGetCommentsByArticleId() throws Exception {
        Integer articleId = 1;
        CommentDto comment1 = new CommentDto();
        comment1.setId(1);
        comment1.setContent("Comment 1");
        comment1.setOwnerId(1);
        comment1.setArticleId(articleId);
        comment1.setOwnerUsername("User 1");

        CommentDto comment2 = new CommentDto();
        comment2.setId(2);
        comment2.setContent("Comment 2");
        comment2.setOwnerId(2);
        comment2.setArticleId(articleId);
        comment2.setOwnerUsername("User 2");

        List<CommentDto> comments = Arrays.asList(comment1, comment2);

        when(commentService.getCommentsByArticleId(articleId)).thenReturn(comments);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/comments/article/{articleId}", articleId)
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(comment1.getId()))
                .andExpect(jsonPath("$[0].content").value(comment1.getContent()))
                .andExpect(jsonPath("$[0].ownerId").value(comment1.getOwnerId()))
                .andExpect(jsonPath("$[0].articleId").value(comment1.getArticleId()))
                .andExpect(jsonPath("$[0].ownerUsername").value(comment1.getOwnerUsername()))
                .andExpect(jsonPath("$[1].id").value(comment2.getId()))
                .andExpect(jsonPath("$[1].content").value(comment2.getContent()))
                .andExpect(jsonPath("$[1].ownerId").value(comment2.getOwnerId()))
                .andExpect(jsonPath("$[1].articleId").value(comment2.getArticleId()))
                .andExpect(jsonPath("$[1].ownerUsername").value(comment2.getOwnerUsername()));
    }

    @Test
    public void testCreateComment() throws Exception {
        CommentDto commentDto = new CommentDto();
        commentDto.setId(1);
        commentDto.setContent("New Comment");
        commentDto.setOwnerId(1);
        commentDto.setArticleId(1);
        commentDto.setOwnerUsername("User 1");

        when(commentService.createComment(any(CommentDto.class))).thenReturn(commentDto);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/comments")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(commentDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(commentDto.getId()))
                .andExpect(jsonPath("$.content").value(commentDto.getContent()))
                .andExpect(jsonPath("$.ownerId").value(commentDto.getOwnerId()))
                .andExpect(jsonPath("$.articleId").value(commentDto.getArticleId()))
                .andExpect(jsonPath("$.ownerUsername").value(commentDto.getOwnerUsername()));
    }
}
