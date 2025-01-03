package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.mappers.ArticleMapper;
import com.openclassrooms.mddapi.repositories.ArticleRepository;
import com.openclassrooms.mddapi.repositories.ArticleThemeRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import com.openclassrooms.mddapi.services.interfaces.ArticleServiceInterface;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ArticleService implements ArticleServiceInterface {

    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;
    private final UserRepository userRepository;
    private final ArticleThemeRepository articleThemeRepository;

    public ArticleService(ArticleRepository articleRepository, ArticleThemeRepository articleThemeRepository, UserRepository userRepository, ArticleMapper articleMapper) {
        this.articleRepository = articleRepository;
        this.articleThemeRepository = articleThemeRepository;
        this.articleMapper = articleMapper;
        this.userRepository = userRepository;
    }

    @Override
    public List<ArticleDto> getAllArticles() {
        return articleRepository.findAll().stream()
                .map(articleMapper::toDTO)
                .toList();
    }

    @Override
    public ArticleDto getArticleById(Integer id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Article not found"));
        return articleMapper.toDTO(article);
    }

    @Override
    public ArticleDto createArticle(ArticleDto articleDto) {
        Article article = new Article();
        article.setTitle(articleDto.getTitle());
        article.setContent(articleDto.getContent());
        article.setDate(new Date());
        User author = userRepository.findById(articleDto.getAuthorId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        article.setAuthor(author);
        articleRepository.save(article);
        return articleMapper.toDTO(article);
    }

    @Override
    public void linkArticleToTheme(Integer articleId, Integer themeId) {
        articleThemeRepository.linkArticleToTheme(articleId, themeId);
    }
}