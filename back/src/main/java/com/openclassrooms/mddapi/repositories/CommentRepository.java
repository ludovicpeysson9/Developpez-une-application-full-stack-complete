package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}