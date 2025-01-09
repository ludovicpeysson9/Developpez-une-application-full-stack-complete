package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.exceptions.CommentCreationException;
import com.openclassrooms.mddapi.exceptions.ResourceNotFoundException;
import com.openclassrooms.mddapi.services.interfaces.CommentServiceInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentServiceInterface commentService;

    public CommentController(CommentServiceInterface commentService) {
        this.commentService = commentService;
    }

    /**
     * Get all comments for a specific article.
     *
     * @param articleId the ID of the article
     * @return a list of comments for the specified article
     */
    @GetMapping("/article/{articleId}")
    public ResponseEntity<List<CommentDto>> getCommentsByArticleId(@PathVariable Integer articleId) {
        List<CommentDto> comments = commentService.getCommentsByArticleId(articleId);
        if (comments.isEmpty()) {
            throw new ResourceNotFoundException("No comments found for article with id: " + articleId);
        }
        return ResponseEntity.ok(comments);
    }

    /**
     * Create a new comment.
     *
     * @param commentDto the comment to create
     * @return the created comment
     */
    @PostMapping
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto) {
        try {
            CommentDto createdComment = commentService.createComment(commentDto);
            return ResponseEntity.ok(createdComment);
        } catch (Exception e) {
            throw new CommentCreationException("Error creating comment: " + e.getMessage());
        }
    }
}