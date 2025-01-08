package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class ArticleMapperTest {

    private ArticleMapper articleMapper;

    @BeforeEach
    public void setUp() {
        articleMapper = new ArticleMapper();
    }

    @Test
    public void testToDTO() {
        // Arrange
        User author = new User();
        author.setId(1);
        author.setUsername("authorUsername");

        Theme theme = new Theme();
        theme.setId(1);
        theme.setTitle("themeTitle");

        Set<Theme> themes = new HashSet<>();
        themes.add(theme);

        Article article = new Article();
        article.setId(1);
        article.setTitle("title");
        article.setContent("content");
        article.setAuthor(author);
        article.setDate(new Date());
        article.setThemes(themes);

        // Act
        ArticleDto articleDto = articleMapper.toDTO(article);

        // Assert
        assertNotNull(articleDto);
        assertEquals(article.getId(), articleDto.getId());
        assertEquals(article.getTitle(), articleDto.getTitle());
        assertEquals(article.getContent(), articleDto.getContent());
        assertEquals(article.getAuthor().getId(), articleDto.getAuthorId());
        assertEquals(article.getAuthor().getUsername(), articleDto.getArticleAuthor());
        assertEquals(article.getDate(), articleDto.getDate());
        assertEquals(theme.getId(), articleDto.getThemeId());
        assertEquals(theme.getTitle(), articleDto.getThemeTitle());
    }

    @Test
    public void testToEntity() {
        // Arrange
        ArticleDto articleDto = new ArticleDto();
        articleDto.setId(1);
        articleDto.setTitle("title");
        articleDto.setContent("content");
        articleDto.setAuthorId(1);
        articleDto.setDate(new Date());

        // Act
        Article article = articleMapper.toEntity(articleDto);

        // Assert
        assertNotNull(article);
        assertEquals(articleDto.getId(), article.getId());
        assertEquals(articleDto.getTitle(), article.getTitle());
        assertEquals(articleDto.getContent(), article.getContent());
        assertEquals(articleDto.getAuthorId(), article.getAuthor().getId());
        assertEquals(articleDto.getDate(), article.getDate());
    }
}