package com.openclassrooms.mddapi.config;

import com.openclassrooms.mddapi.services.CustomUserDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class JwtTokenFilterTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtUtils jwtUtils;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testDoFilterInternal_ValidToken() throws Exception {
        String token = "valid-jwt-token";
        when(jwtUtils.validateJwtToken(token)).thenReturn(true);
        when(jwtUtils.getUserIdFromJwtToken(token)).thenReturn(1);
        UserDetails userDetails = new User("user", "password", new ArrayList<>());
        when(customUserDetailsService.loadUserById(1)).thenReturn(userDetails);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/articles")
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    public void testDoFilterInternal_InvalidToken() throws Exception {
        String token = "invalid-jwt-token";
        when(jwtUtils.validateJwtToken(token)).thenReturn(false);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/articles")
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isUnauthorized());
    }
}