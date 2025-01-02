package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.CommentDto;
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

    @GetMapping("/article/{articleId}")
    public ResponseEntity<List<CommentDto>> getCommentsByArticleId(@PathVariable Integer articleId) {
        List<CommentDto> comments = commentService.getCommentsByArticleId(articleId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto) {
        CommentDto createdComment = commentService.createComment(commentDto);
        return ResponseEntity.ok(createdComment);
    }
}