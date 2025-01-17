# MDD Project Setup

This is the setup guide for the **MDD (Monde de Dév)** project. Follow the steps below to set up the database, backend, and frontend.

## 1. Setting Up the Database

To begin, you need to create the required database and tables for the project. Run the following SQL script on your MySQL/MariaDB database:

```sql
CREATE TABLE "users" (
  "id" int NOT NULL AUTO_INCREMENT,
  "username" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  "email" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  "password" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "Email" ("email")
);

CREATE TABLE "themes" (
  "id" int NOT NULL AUTO_INCREMENT,
  "title" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  "content" text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY ("id")
);

CREATE TABLE "articles" (
  "id" int NOT NULL AUTO_INCREMENT,
  "title" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  "date" datetime DEFAULT CURRENT_TIMESTAMP,
  "author" int NOT NULL,
  "content" text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY ("id"),
  KEY "Author" ("author"),
  CONSTRAINT "articles_ibfk_1" FOREIGN KEY ("author") REFERENCES "users" ("id") ON DELETE CASCADE
);

CREATE TABLE "comments" (
  "id" int NOT NULL AUTO_INCREMENT,
  "owner_id" int NOT NULL,
  "article_id" int NOT NULL,
  "content" text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY ("id"),
  KEY "Owner" ("owner_id"),
  KEY "Article" ("article_id"),
  CONSTRAINT "comments_ibfk_1" FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE CASCADE,
  CONSTRAINT "comments_ibfk_2" FOREIGN KEY ("article_id") REFERENCES "articles" ("id") ON DELETE CASCADE
);

CREATE TABLE "articles_themes" (
  "article_id" int NOT NULL,
  "theme_id" int NOT NULL,
  PRIMARY KEY ("article_id","theme_id"),
  KEY "ThemeId" ("theme_id"),
  CONSTRAINT "articles_themes_ibfk_1" FOREIGN KEY ("article_id") REFERENCES "articles" ("id") ON DELETE CASCADE,
  CONSTRAINT "articles_themes_ibfk_2" FOREIGN KEY ("theme_id") REFERENCES "themes" ("id") ON DELETE CASCADE
);

CREATE TABLE "abonnements" (
  "user_id" int NOT NULL,
  "theme_id" int NOT NULL,
  PRIMARY KEY ("user_id","theme_id"),
  KEY "ThemeId" ("theme_id"),
  CONSTRAINT "abonnements_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE,
  CONSTRAINT "abonnements_ibfk_2" FOREIGN KEY ("theme_id") REFERENCES "themes" ("id") ON DELETE CASCADE
);
```

## 2. Setting Up the application

You'll find the instructions of the API and the FrontEnd Application in their respective directory. 
We recommand to proceed in this order : 

1. Create the database
2. Install the API
3. Install the FrontEnd Application