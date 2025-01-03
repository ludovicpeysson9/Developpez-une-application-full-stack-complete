package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.ArticleTheme;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ArticleThemeRepository extends JpaRepository<ArticleTheme, Integer> {
    
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO articles_themes (article_id, theme_id) VALUES (?1, ?2)", nativeQuery = true)
    void linkArticleToTheme(Integer articleId, Integer themeId);
}