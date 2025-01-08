package com.openclassrooms.mddapi.services.interfaces;

import com.openclassrooms.mddapi.dto.CommentDto;

import java.util.List;

public interface CommentServiceInterface {

    /**
     * Get all comments for a specific article.
     *
     * @param articleId the ID of the article
     * @return a list of comments for the specified article
     */
    List<CommentDto> getCommentsByArticleId(Integer articleId);

    /**
     * Create a new comment.
     *
     * @param commentDto the comment to create
     * @return the created comment
     */
    CommentDto createComment(CommentDto commentDto);
}