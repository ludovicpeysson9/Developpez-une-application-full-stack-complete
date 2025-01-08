package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.EmailRequest;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.dto.UserUpdateRequest;
import com.openclassrooms.mddapi.services.UserSecurityService;
import com.openclassrooms.mddapi.services.interfaces.UserServiceInterface;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserServiceInterface userService;

    @MockBean
    private UserSecurityService userSecurityService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        // Setup here
    }

    @Test
    @WithMockUser(username="user", roles={"USER"})
    public void testGetUserByEmail() throws Exception {
        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setEmail("test@example.com");

        UserDto userDto = new UserDto();
        userDto.setId(1);
        userDto.setEmail("test@example.com");
        userDto.setUsername("testuser");

        Mockito.when(userService.getUserByEmail("test@example.com")).thenReturn(userDto);

        mockMvc.perform(get("/api/user/getUserByEmail") 
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(emailRequest)))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(userDto)));
    }

    @Test
    @WithMockUser(username="user", roles={"USER"})
    public void testUpdateUser() throws Exception {
        Integer userId = 1;
        UserUpdateRequest userUpdateRequest = new UserUpdateRequest();
        userUpdateRequest.setUsername("updateduser");
        userUpdateRequest.setEmail("updated@example.com");

        UserDto updatedUser = new UserDto();
        updatedUser.setId(userId);
        updatedUser.setUsername("updateduser");
        updatedUser.setEmail("updated@example.com");

        Mockito.when(userSecurityService.isOwner(userId)).thenReturn(true);
        Mockito.when(userService.updateUser(userId, userUpdateRequest)).thenReturn(updatedUser);

        mockMvc.perform(put("/api/user/{id}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userUpdateRequest)))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(updatedUser)));
    }

    @Test
    @WithMockUser(username="user", roles={"USER"})
    public void testUpdateUserForbidden() throws Exception {
        Integer userId = 1;
        UserUpdateRequest userUpdateRequest = new UserUpdateRequest();
        userUpdateRequest.setUsername("updateduser");
        userUpdateRequest.setEmail("updated@example.com");

        Mockito.when(userSecurityService.isOwner(userId)).thenReturn(false);

        mockMvc.perform(put("/api/user/{id}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userUpdateRequest)))
                .andExpect(status().isForbidden());
    }
}
