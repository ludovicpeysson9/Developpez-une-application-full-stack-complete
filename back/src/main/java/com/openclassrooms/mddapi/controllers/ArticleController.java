package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.services.UserSecurityService;
import com.openclassrooms.mddapi.services.interfaces.ArticleServiceInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleServiceInterface articleService;
    private final UserSecurityService userSecurityService;

    public ArticleController(ArticleServiceInterface articleService, UserSecurityService userSecurityService) {
        this.articleService = articleService;
        this.userSecurityService = userSecurityService;
    }

    @GetMapping
    public ResponseEntity<List<ArticleDto>> getAllArticles() {
        List<ArticleDto> articles = articleService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDto> getArticleById(@PathVariable Integer id) {
        ArticleDto article = articleService.getArticleById(id);
        return ResponseEntity.ok(article);
    }

    @PostMapping("/createArticle")
    public ResponseEntity<ArticleDto> createArticle(@RequestBody ArticleDto articleDto) {
        if (!userSecurityService.isOwner(articleDto.getAuthorId())) {
            return ResponseEntity.status(403).build();
        }
        ArticleDto createdArticle = articleService.createArticle(articleDto);
        articleService.linkArticleToTheme(createdArticle.getId(), articleDto.getThemeId()); // Lier l'article au thème
        return ResponseEntity.ok(createdArticle);
    }
}