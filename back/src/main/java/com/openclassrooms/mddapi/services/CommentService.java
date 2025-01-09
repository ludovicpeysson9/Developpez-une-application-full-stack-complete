package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.exceptions.ServiceException;
import com.openclassrooms.mddapi.mappers.CommentMapper;
import com.openclassrooms.mddapi.repositories.ArticleRepository;
import com.openclassrooms.mddapi.repositories.CommentRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import com.openclassrooms.mddapi.services.interfaces.CommentServiceInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService implements CommentServiceInterface {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    public CommentService(CommentRepository commentRepository, CommentMapper commentMapper,UserRepository userRepository, ArticleRepository articleRepository) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
        this.userRepository = userRepository;
        this.articleRepository = articleRepository;
    }

    @Override
    public List<CommentDto> getCommentsByArticleId(Integer articleId) {
        try {
            return commentRepository.findAll().stream()
                    .filter(comment -> comment.getArticle().getId().equals(articleId))
                    .map(commentMapper::toDTO)
                    .toList();
        } catch (Exception e) {
            throw new ServiceException("Error retrieving comments for article with id: " + articleId + ". " + e.getMessage());
        }
    }

    @Override
    public CommentDto createComment(CommentDto commentDto) {
        try {
            Comment comment = new Comment();
            comment.setContent(commentDto.getContent());

            User owner = userRepository.findById(commentDto.getOwnerId())
                    .orElseThrow(() -> new ServiceException("User not found with id: " + commentDto.getOwnerId()));
            comment.setOwner(owner);

            Article article = articleRepository.findById(commentDto.getArticleId())
                    .orElseThrow(() -> new ServiceException("Article not found with id: " + commentDto.getArticleId()));
            comment.setArticle(article);

            commentRepository.save(comment);
            return commentMapper.toDTO(comment);
        } catch (Exception e) {
            throw new ServiceException("Error creating comment: " + e.getMessage());
        }
    }
}