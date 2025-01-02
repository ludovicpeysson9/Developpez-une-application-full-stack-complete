package com.openclassrooms.mddapi.entities;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@Embeddable
public class ArticleThemeId implements Serializable {
    private int article;
    private int theme;

    public ArticleThemeId(int article, int theme) {
        this.article = article;
        this.theme = theme;
    }
}