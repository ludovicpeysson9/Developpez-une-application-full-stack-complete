package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class CommentMapperTest {

    private CommentMapper commentMapper;

    @BeforeEach
    public void setUp() {
        commentMapper = new CommentMapper();
    }

    @Test
    public void testToDTO() {
        // Arrange
        User owner = new User();
        owner.setId(1);
        owner.setUsername("ownerUsername");

        Article article = new Article();
        article.setId(1);

        Comment comment = new Comment();
        comment.setId(1);
        comment.setContent("content");
        comment.setOwner(owner);
        comment.setArticle(article);

        // Act
        CommentDto commentDto = commentMapper.toDTO(comment);

        // Assert
        assertNotNull(commentDto);
        assertEquals(comment.getId(), commentDto.getId());
        assertEquals(comment.getContent(), commentDto.getContent());
        assertEquals(comment.getOwner().getId(), commentDto.getOwnerId());
        assertEquals(comment.getOwner().getUsername(), commentDto.getOwnerUsername());
        assertEquals(comment.getArticle().getId(), commentDto.getArticleId());
    }

    @Test
    public void testToEntity() {
        // Arrange
        CommentDto commentDto = new CommentDto();
        commentDto.setId(1);
        commentDto.setContent("content");
        commentDto.setOwnerId(1);
        commentDto.setArticleId(1);

        // Act
        Comment comment = commentMapper.toEntity(commentDto);

        // Assert
        assertNotNull(comment);
        assertEquals(commentDto.getId(), comment.getId());
        assertEquals(commentDto.getContent(), comment.getContent());
        assertEquals(commentDto.getOwnerId(), comment.getOwner().getId());
        assertEquals(commentDto.getArticleId(), comment.getArticle().getId());
    }
}