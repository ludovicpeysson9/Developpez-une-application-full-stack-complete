package com.openclassrooms.mddapi.services.interfaces;

import com.openclassrooms.mddapi.dto.ArticleDto;

import java.util.List;

public interface ArticleServiceInterface {

    /**
     * Get all articles.
     *
     * @return a list of all articles
     */
    List<ArticleDto> getAllArticles();

    /**
     * Get an article by its ID.
     *
     * @param id the ID of the article
     * @return the article with the specified ID
     */
    ArticleDto getArticleById(Integer id);

    /**
     * Create a new article.
     *
     * @param articleDto the article to create
     * @return the created article
     */
    ArticleDto createArticle(ArticleDto articleDto);

    /**
     * Link an article to a theme.
     *
     * @param articleId the ID of the article
     * @param themeId the ID of the theme
     */
    void linkArticleToTheme(Integer articleId, Integer themeId);
}