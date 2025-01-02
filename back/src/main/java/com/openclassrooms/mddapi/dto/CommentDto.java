package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class CommentDto {
    private Integer id;
    private String content;
    private String owner;
    private Integer articleId;
}