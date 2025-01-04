package com.openclassrooms.mddapi.dto;

import java.util.Date;
import lombok.Data;

@Data
public class ArticleDto {
    private Integer id;
    private String title;
    private String content;
    private Integer authorId;
    private Integer themeId;
    private String themeTitle;
    private Date date;
    private String articleAuthor;
}