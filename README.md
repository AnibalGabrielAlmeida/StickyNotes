# Backend README

This README provides information about the structure and configuration of the backend of the application.

## Project Structure

The project follows a standard Spring Boot structure with the following main packages:

- **com.ensolvers.notes.controller**: Contains controllers that handle HTTP requests and responses.

- **com.ensolvers.notes.model**: Defines domain entities, such as `Note` and `Tag`, using JPA.

- **com.ensolvers.notes.repository**: Contains repository interfaces that extend `JpaRepository` to perform database operations.

- **com.ensolvers.notes.service**: Contains service interfaces and classes that implement business logic.

## Database Configuration

The backend is configured to use MariaDB as the database. Below is the configuration in `application.properties`:

```properties
# DataSource settings for MariaDB with UTF-8
spring.datasource.url=jdbc:mariadb://localhost:3306/your_database_name?useUnicode=true&characterEncoding=utf-8
spring.datasource.driverClassName=org.mariadb.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=J!mh4ll3127

# H2 Console settings (if you want to keep it for development purposes)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Hibernate settings
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```
## Endpoints

### Notes

- **POST /note/create**: Creates a new note.
- **GET /note/list**: Gets all notes.
- **GET /note/list/archived**: Gets all archived notes.
- **GET /note/find/{id}**: Gets a note by its ID.
- **PUT /note/edit/{id}**: Updates an existing note.
- **DELETE /note/delete/{id}**: Deletes a note by its ID.
- **PUT /note/archive/{id}**: Archives a note by its ID.
- **PUT /note/unarchive/{id}**: Unarchives a note by its ID.
- **PUT /note/addTags/{id}**: Adds tags to a note by its ID.
- **PUT /note/updateTags/{id}**: Updates the tags of a note by its ID.
- **DELETE /note/removeTags/{id}**: Removes tags from a note by its ID.
- **GET /note/filterByTags**: Filters notes by specified tags.

### Tags

- **POST /tag/create**: Creates a new tag.
- **GET /tag/list**: Gets all tags.
- **GET /tag/find/{id}**: Gets a tag by its ID.
- **PUT /tag/edit/{id}**: Updates an existing tag.
- **DELETE /tag/delete/{id}**: Deletes a tag by its ID.

## Additional Configuration

The backend uses a set of additional tools and technologies, such as Spring Boot, Spring Data JPA, and Spring Web. Ensure you have the necessary dependencies for its proper functioning.
