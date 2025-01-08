package com.openclassrooms.mddapi.config;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootTest
@TestPropertySource(properties = {
    "app.jwtSecret=verysecretkeyfortestingpurposebecauseineedaverylongkeyanditsreallyboringcauseidontliketesting",
    "app.jwtExpirationMs=3600000"
})
public class JwtUtilsTest {

    @Autowired
    private JwtUtils jwtUtils;

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @BeforeEach
    public void setup() {
        assertNotNull(jwtSecret);
        assertTrue(jwtExpirationMs > 0);
    }

    @Test
    public void testGenerateAndValidateToken() {
        Integer userId = 1;
        String token = jwtUtils.generateJwtToken(userId);
        assertNotNull(token);

        // Validate token
        assertTrue(jwtUtils.validateJwtToken(token));

        // Extract user id
        assertEquals(userId, jwtUtils.getUserIdFromJwtToken(token));
    }
}