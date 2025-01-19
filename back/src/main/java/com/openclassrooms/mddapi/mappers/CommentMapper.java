package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.entities.User;

import org.springframework.stereotype.Component;

@Component
public class CommentMapper {
    public CommentDto toDTO(Comment comment) {
        CommentDto dto = new CommentDto();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setOwnerId(comment.getOwner().getId());
        dto.setArticleId(comment.getArticle().getId());
        dto.setOwnerUsername(comment.getOwner().getUsername()); 
        dto.setDate(comment.getDate());
        return dto;
    }

        public Comment toEntity(CommentDto commentDto) {
        Comment comment = new Comment();
        comment.setId(commentDto.getId());
        comment.setContent(commentDto.getContent());

        User owner = new User();
        owner.setId(commentDto.getOwnerId());
        comment.setOwner(owner);
        
        Article article = new Article();
        article.setId(commentDto.getArticleId());
        comment.setArticle(article);
        return comment;
    }
}