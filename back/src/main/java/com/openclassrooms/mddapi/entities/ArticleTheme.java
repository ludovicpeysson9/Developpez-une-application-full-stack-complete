package com.openclassrooms.mddapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "article_themes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleTheme {
    @EmbeddedId
    private ArticleThemeId id;

    @ManyToOne
    @MapsId("article")
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @ManyToOne
    @MapsId("theme")
    @JoinColumn(name = "theme_id", nullable = false)
    private Theme theme;
}