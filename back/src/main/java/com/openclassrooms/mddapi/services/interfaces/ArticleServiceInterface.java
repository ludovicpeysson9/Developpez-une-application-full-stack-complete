package com.openclassrooms.mddapi.services.interfaces;

import com.openclassrooms.mddapi.dto.ArticleDto;

import java.util.List;

public interface ArticleServiceInterface {
    List<ArticleDto> getAllArticles();
    ArticleDto getArticleById(Integer id);
    ArticleDto createArticle(ArticleDto articleDto);
}