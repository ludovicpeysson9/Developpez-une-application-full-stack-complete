package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.entities.Article;
import org.springframework.stereotype.Component;

@Component
public class ArticleMapper {
    public ArticleDto toDTO(Article article) {
        ArticleDto dto = new ArticleDto();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setContent(article.getContent());
        dto.setAuthor(article.getAuthor().getUsername());
        dto.setDate(article.getDate().toString());
        return dto;
    }
}