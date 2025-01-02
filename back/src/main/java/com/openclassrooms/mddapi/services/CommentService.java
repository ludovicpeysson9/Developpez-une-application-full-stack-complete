package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.mappers.CommentMapper;
import com.openclassrooms.mddapi.repositories.CommentRepository;
import com.openclassrooms.mddapi.services.interfaces.CommentServiceInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService implements CommentServiceInterface {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    public CommentService(CommentRepository commentRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
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
        // Set other fields as necessary
        commentRepository.save(comment);
        return commentMapper.toDTO(comment);
    }
}