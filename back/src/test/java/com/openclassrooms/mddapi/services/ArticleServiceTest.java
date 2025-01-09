package com.openclassrooms.mddapi.services;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.exceptions.ServiceException;
import com.openclassrooms.mddapi.mappers.ArticleMapper;
import com.openclassrooms.mddapi.repositories.ArticleRepository;
import com.openclassrooms.mddapi.repositories.ArticleThemeRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public class ArticleServiceTest {

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private ArticleMapper articleMapper;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ArticleThemeRepository articleThemeRepository;

    @InjectMocks
    private ArticleService articleService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllArticles() {
        // Arrange
        Article article = new Article();
        article.setId(1);
        when(articleRepository.findAll()).thenReturn(List.of(article));
        ArticleDto articleDto = new ArticleDto();
        articleDto.setId(1);
        when(articleMapper.toDTO(article)).thenReturn(articleDto);

        // Act
        List<ArticleDto> result = articleService.getAllArticles();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(1, result.get(0).getId());
    }

    @Test
    public void testGetAllArticles_Exception() {
        // Arrange
        when(articleRepository.findAll()).thenThrow(new RuntimeException("Database error"));

        // Act & Assert
        ServiceException exception = assertThrows(ServiceException.class, () -> {
            articleService.getAllArticles();
        });
        assertEquals("Error retrieving all articles: Database error", exception.getMessage());
    }

    @Test
    public void testGetArticleById() {
        // Arrange
        Integer articleId = 1;
        Article article = new Article();
        article.setId(articleId);
        when(articleRepository.findById(articleId)).thenReturn(Optional.of(article));
        ArticleDto articleDto = new ArticleDto();
        articleDto.setId(articleId);
        when(articleMapper.toDTO(article)).thenReturn(articleDto);

        // Act
        ArticleDto result = articleService.getArticleById(articleId);

        // Assert
        assertNotNull(result);
        assertEquals(articleId, result.getId());
    }

    @Test
    public void testGetArticleById_NotFound() {
        // Arrange
        Integer articleId = 1;
        when(articleRepository.findById(articleId)).thenReturn(Optional.empty());

        // Act & Assert
        ServiceException exception = assertThrows(ServiceException.class, () -> {
            articleService.getArticleById(articleId);
        });
        assertEquals("Error retrieving article by id: Article not found with id: " + articleId, exception.getMessage());
    }

    @Test
    public void testCreateArticle() {
        // Arrange
        ArticleDto articleDto = new ArticleDto();
        articleDto.setTitle("title");
        articleDto.setContent("content");
        articleDto.setAuthorId(1);

        User author = new User();
        author.setId(1);
        when(userRepository.findById(1)).thenReturn(Optional.of(author));

        Article article = new Article();
        article.setTitle("title");
        article.setContent("content");
        article.setDate(new Date());
        article.setAuthor(author);

        ArgumentCaptor<Article> articleCaptor = ArgumentCaptor.forClass(Article.class);
        when(articleRepository.save(articleCaptor.capture())).thenReturn(article);
        when(articleMapper.toDTO(any(Article.class))).thenReturn(articleDto);

        // Act
        ArticleDto result = articleService.createArticle(articleDto);

        // Assert
        assertNotNull(result);
        assertEquals(articleDto.getTitle(), result.getTitle());
        assertEquals(articleDto.getContent(), result.getContent());
        assertEquals(articleDto.getAuthorId(), result.getAuthorId());

        Article capturedArticle = articleCaptor.getValue();
        assertNotNull(capturedArticle);
        assertEquals(articleDto.getTitle(), capturedArticle.getTitle());
        assertEquals(articleDto.getContent(), capturedArticle.getContent());
        assertEquals(articleDto.getAuthorId(), capturedArticle.getAuthor().getId());
    }

    @Test
    public void testCreateArticle_UserNotFound() {
        // Arrange
        ArticleDto articleDto = new ArticleDto();
        articleDto.setTitle("title");
        articleDto.setContent("content");
        articleDto.setAuthorId(1);

        when(userRepository.findById(1)).thenReturn(Optional.empty());

        // Act & Assert
        ServiceException exception = assertThrows(ServiceException.class, () -> {
            articleService.createArticle(articleDto);
        });
        assertEquals("Error creating article: User not found with id: 1", exception.getMessage());
    }

    @Test
    public void testLinkArticleToTheme() {
        // Arrange
        Integer articleId = 1;
        Integer themeId = 1;

        // Act
        articleService.linkArticleToTheme(articleId, themeId);

        // Assert
        verify(articleThemeRepository, times(1)).linkArticleToTheme(articleId, themeId);
    }

    @Test
    public void testLinkArticleToTheme_Exception() {
        // Arrange
        Integer articleId = 1;
        Integer themeId = 1;
        doThrow(new RuntimeException("Database error")).when(articleThemeRepository).linkArticleToTheme(articleId, themeId);

        // Act & Assert
        ServiceException exception = assertThrows(ServiceException.class, () -> {
            articleService.linkArticleToTheme(articleId, themeId);
        });
        assertEquals("Error linking article to theme: Database error", exception.getMessage());
    }
}