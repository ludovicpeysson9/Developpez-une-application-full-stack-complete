package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.exceptions.ArticleCreationException;
import com.openclassrooms.mddapi.exceptions.ResourceNotFoundException;
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

    /**
     * Get all articles.
     *
     * @return a list of all articles
     */
    @GetMapping
    public ResponseEntity<List<ArticleDto>> getAllArticles() {
        List<ArticleDto> articles = articleService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

    /**
     * Get an article by its ID.
     *
     * @param id the ID of the article
     * @return the article with the specified ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ArticleDto> getArticleById(@PathVariable Integer id) {
        ArticleDto article = articleService.getArticleById(id);
        if (article != null) {
            return ResponseEntity.ok(article);
        } else {
            throw new ResourceNotFoundException("Article not found with id: " + id);
        }
    }


    /**
     * Create a new article.
     *
     * @param articleDto the article to create
     * @return the created article
     */
    @PostMapping("/createArticle")
    public ResponseEntity<ArticleDto> createArticle(@RequestBody ArticleDto articleDto) {
        if (!userSecurityService.isOwner(articleDto.getAuthorId())) {
            return ResponseEntity.status(403).build();
        }
        try {
            ArticleDto createdArticle = articleService.createArticle(articleDto);
            articleService.linkArticleToTheme(createdArticle.getId(), articleDto.getThemeId());
            return ResponseEntity.ok(createdArticle);
        } catch (Exception e) {
            throw new ArticleCreationException("Error creating article: " + e.getMessage());
        }
    }
}