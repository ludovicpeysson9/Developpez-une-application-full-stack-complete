# MDD API - Backend

This repository contains the backend API for the MDD project, a social network dedicated to developers. It is built using Spring Boot and provides a RESTful API for the platform. 

## Technologies Used

- **Java**: Version 21
- **Spring Boot**: Version 3.1.4
- **Maven**: Version 3.9.9
- **MariaDB**: Database used
- **Swagger-UI**: For API documentation and visualization

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- Java Development Kit (JDK) 21
- Maven 3.9.9 or higher
- A running instance of MariaDB or MySql

### Steps

1. **Clone the Repository**:

    Be sure to have cloned the whole project :

   ```bash
   git clone <https://github.com/ludovicpeysson9/Developpez-une-application-full-stack-complete.git>
   cd mdd-api
   ```

2. **Set Up Environment Variables**:

    You need to connect to a MySql or MariaDb Database to run this project.

   Create a `.env` file at the root of the api project (where's the pom.xml) with the following variables:

   ```env
   DB_USERNAME=<your-database-username>
   DB_PASSWORD=<your-database-password>
   JWT_SECRET=<your-jwt-secret>
   ```

3. **Build the Project**:

   ```bash
   mvn clean install
   ```

   Or use the specific maven tools

4. **Run the Application**:

   ```bash
   mvn spring-boot:run
   ```

   The application will start on `http://localhost:8080` by default.

## Configuration

### DataSource

The following properties are configured in `application.properties` but are populated using environment variables:

```properties
spring.datasource.url=jdbc:mariadb://mysql-projetfullstackoc-ludovic-92ae.l.aivencloud.com:24177/defaultdb
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=none
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MariaDBDialect
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.show-sql=true
```

### JWT

JWT settings are also configured using environment variables:

```properties
app.jwtSecret=${JWT_SECRET}
app.jwtExpirationMs=86400000
```

### Swagger-UI

Swagger-UI is enabled by default. You can access the API documentation at:

```
http://localhost:8080/swagger-ui.html
```

## Code Highlights

### Environment Variables Loading

The application uses the `dotenv-java` library to load environment variables from a `.env` file. This is initialized in the main entry point:

```java
package com.openclassrooms.mddapi;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MddApiApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
        SpringApplication.run(MddApiApplication.class, args);
    }
}
```

## Testing

To run the tests, use:

```bash
mvn test
```

Note: Testing is configured with the `maven-surefire-plugin` and includes exclusions for DTOs, entities, and exceptions in coverage reporting.

## Additional Features

- **Jacoco**: Configured for code coverage reporting
- **Logback**: Logstash encoder for structured logging

---

For further information, please refer to the project documentation or contact the development team.
