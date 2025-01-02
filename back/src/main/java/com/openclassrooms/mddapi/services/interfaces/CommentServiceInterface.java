package com.openclassrooms.mddapi.services.interfaces;

import com.openclassrooms.mddapi.dto.CommentDto;

import java.util.List;

public interface CommentServiceInterface {
    List<CommentDto> getCommentsByArticleId(Integer articleId);
    CommentDto createComment(CommentDto commentDto);
}