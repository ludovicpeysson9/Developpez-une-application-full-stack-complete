package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.User;

import org.springframework.stereotype.Component;

@Component
public class ArticleMapper {
    public ArticleDto toDTO(Article article) {
        ArticleDto dto = new ArticleDto();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setContent(article.getContent());
        dto.setAuthorId(article.getAuthor().getId()); // Utiliser l'ID de l'auteur
        dto.setDate(article.getDate()); // Utiliser LocalDateTime directement
        if (article.getThemes() != null && !article.getThemes().isEmpty()) {
            dto.setThemeId(article.getThemes().iterator().next().getId());
        }
        return dto;
    }
    public Article toEntity(ArticleDto articleDto) {
        Article article = new Article();
        article.setId(articleDto.getId());
        article.setTitle(articleDto.getTitle());
        article.setContent(articleDto.getContent());
        article.setDate(articleDto.getDate());
        // Récupérer l'auteur par son ID et le définir
        User author = new User();
        author.setId(articleDto.getAuthorId());
        article.setAuthor(author);
        return article;
    }
}