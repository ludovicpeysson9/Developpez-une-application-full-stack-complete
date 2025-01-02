package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.entities.Comment;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {
    public CommentDto toDTO(Comment comment) {
        CommentDto dto = new CommentDto();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setOwner(comment.getOwner().getUsername());
        dto.setArticleId(comment.getArticle().getId());
        return dto;
    }
}