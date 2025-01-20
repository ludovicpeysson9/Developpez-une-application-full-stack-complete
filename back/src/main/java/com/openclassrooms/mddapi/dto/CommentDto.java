package com.openclassrooms.mddapi.dto;

import lombok.Data;
import java.util.Date;

@Data
public class CommentDto {
    private Integer id;
    private String content;
    private Integer ownerId;
    private Integer articleId;
    private String ownerUsername;
    private Date date;
}