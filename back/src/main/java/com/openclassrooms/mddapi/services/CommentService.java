package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.entities.User;
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
        return commentRepository.findAll().stream()
                .filter(comment -> comment.getArticle().getId().equals(articleId))
                .map(commentMapper::toDTO)
                .toList();
    }

    @Override
    public CommentDto createComment(CommentDto commentDto) {
        Comment comment = new Comment();
        comment.setContent(commentDto.getContent());

        User owner = userRepository.findById(commentDto.getOwnerId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        comment.setOwner(owner);

        Article article = articleRepository.findById(commentDto.getArticleId())
                .orElseThrow(() -> new IllegalArgumentException("Article not found"));
        comment.setArticle(article);

        commentRepository.save(comment);
        return commentMapper.toDTO(comment);
    }
}