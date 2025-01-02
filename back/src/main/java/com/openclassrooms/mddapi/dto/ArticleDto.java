package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class ArticleDto {
    private Integer id;
    private String title;
    private String content;
    private String author;
    private String date;
}