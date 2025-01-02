package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.ArticleTheme;
import com.openclassrooms.mddapi.entities.ArticleThemeId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleThemeRepository extends JpaRepository<ArticleTheme, ArticleThemeId> {
}