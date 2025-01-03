package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class CommentDto {
    private Integer id;
    private String content;
    private Integer ownerId;
    private Integer articleId;
}