package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.exceptions.ServiceException;
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
        try {
            return articleRepository.findAll().stream()
                    .map(articleMapper::toDTO)
                    .toList();
        } catch (Exception e) {
            throw new ServiceException("Error retrieving all articles: " + e.getMessage());
        }
    }

    @Override
    public ArticleDto getArticleById(Integer id) {
        try {
            Article article = articleRepository.findById(id)
                    .orElseThrow(() -> new ServiceException("Article not found with id: " + id));
            return articleMapper.toDTO(article);
        } catch (Exception e) {
            throw new ServiceException("Error retrieving article by id: " + e.getMessage());
        }
    }

    @Override
    public ArticleDto createArticle(ArticleDto articleDto) {
        try {
            Article article = new Article();
            article.setTitle(articleDto.getTitle());
            article.setContent(articleDto.getContent());
            article.setDate(new Date());
            User author = userRepository.findById(articleDto.getAuthorId())
                    .orElseThrow(() -> new ServiceException("User not found with id: " + articleDto.getAuthorId()));
            article.setAuthor(author);
            articleRepository.save(article);
            return articleMapper.toDTO(article);
        } catch (Exception e) {
            throw new ServiceException("Error creating article: " + e.getMessage());
        }
    }

    @Override
    public void linkArticleToTheme(Integer articleId, Integer themeId) {
        try {
            articleThemeRepository.linkArticleToTheme(articleId, themeId);
        } catch (Exception e) {
            throw new ServiceException("Error linking article to theme: " + e.getMessage());
        }
    }
    
}