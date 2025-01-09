package com.openclassrooms.mddapi.services;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.exceptions.ServiceException;
import com.openclassrooms.mddapi.mappers.CommentMapper;
import com.openclassrooms.mddapi.repositories.ArticleRepository;
import com.openclassrooms.mddapi.repositories.CommentRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

public class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private CommentMapper commentMapper;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ArticleRepository articleRepository;

    @InjectMocks
    private CommentService commentService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetCommentsByArticleId() {
        // Arrange
        Integer articleId = 1;
        Comment comment = new Comment();
        Article article = new Article();
        article.setId(articleId);
        comment.setArticle(article);
        when(commentRepository.findAll()).thenReturn(List.of(comment));
        CommentDto commentDto = new CommentDto();
        when(commentMapper.toDTO(comment)).thenReturn(commentDto);

        // Act
        List<CommentDto> result = commentService.getCommentsByArticleId(articleId);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(commentDto, result.get(0));
    }

    @Test
    public void testGetCommentsByArticleId_Exception() {
        // Arrange
        Integer articleId = 1;
        when(commentRepository.findAll()).thenThrow(new RuntimeException("Database error"));

        // Act & Assert
        ServiceException exception = assertThrows(ServiceException.class, () -> {
            commentService.getCommentsByArticleId(articleId);
        });
        assertEquals("Error retrieving comments for article with id: " + articleId + ". Database error", exception.getMessage());
    }

    @Test
    public void testCreateComment() {
        // Arrange
        CommentDto commentDto = new CommentDto();
        commentDto.setContent("content");
        commentDto.setOwnerId(1);
        commentDto.setArticleId(1);

        User owner = new User();
        owner.setId(1);
        when(userRepository.findById(1)).thenReturn(Optional.of(owner));

        Article article = new Article();
        article.setId(1);
        when(articleRepository.findById(1)).thenReturn(Optional.of(article));

        Comment comment = new Comment();
        comment.setContent("content");
        comment.setOwner(owner);
        comment.setArticle(article);

        when(commentRepository.save(any(Comment.class))).thenReturn(comment);
        when(commentMapper.toDTO(comment)).thenReturn(commentDto);

        // Act
        CommentDto result = commentService.createComment(commentDto);

        // Assert
        assertNotNull(result);
        assertEquals(commentDto.getContent(), result.getContent());
        assertEquals(commentDto.getOwnerId(), result.getOwnerId());
        assertEquals(commentDto.getArticleId(), result.getArticleId());
    }

    @Test
    public void testCreateComment_UserNotFound() {
        // Arrange
        CommentDto commentDto = new CommentDto();
        commentDto.setContent("content");
        commentDto.setOwnerId(1);
        commentDto.setArticleId(1);

        when(userRepository.findById(1)).thenReturn(Optional.empty());

        // Act & Assert
        ServiceException exception = assertThrows(ServiceException.class, () -> {
            commentService.createComment(commentDto);
        });
        assertEquals("Error creating comment: User not found with id: 1", exception.getMessage());
    }
    
}