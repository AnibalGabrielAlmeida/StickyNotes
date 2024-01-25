#Setup in my pc
Im running a windows 11 Home edition 23H2
JDK 17.0.10 x64
MariaDb 11.2 64x
Node v20.2.0
Npm 9.8.1
React + vite@5.0.12
Spring boot 3.2.2 with maven jar packaging

#Setting up application.properties
The backend is configured to use MariaDB as the database. Below is the configuration in `application.properties`:

```properties
# DataSource settings for MariaDB with UTF-8
spring.datasource.url=jdbc:mariadb://localhost:3306/ensolver_db?useUnicode=true&characterEncoding=utf-8
spring.datasource.driverClassName=org.mariadb.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=

# H2 Console settings (if you want to keep it for development purposes)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Hibernate settings
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```
```
-- **database-setup.sql**

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS ensolver_db;

-- Use the created database
USE ensolver_db;

-- Create the 'note' table
CREATE TABLE IF NOT EXISTS note (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  archived BOOLEAN NOT NULL
);

-- Create the 'tag' table
CREATE TABLE IF NOT EXISTS tag (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create the 'note_tags' table
CREATE TABLE IF NOT EXISTS note_tags (
  note_id BIGINT,
  tag_id BIGINT,
  PRIMARY KEY (note_id, tag_id),
  FOREIGN KEY (note_id) REFERENCES note(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE
);

-- Insert sample data into the 'note' table
INSERT INTO note (title, content, archived) VALUES
('Note 1 Title', 'Content of Note 1', false),
('Note 2 Title', 'Content of Note 2', false),
('Note 3 Title', 'Content of Note 3', true),
('Note 4 Title', 'Content of Note 4', true);

-- Insert sample data into the 'tag' table
INSERT INTO tag (name) VALUES
('Tag 1'),
('Tag 2'),
('Tag 3'),
('Tag 4');

-- Insert sample data into the 'note_tags' table
INSERT INTO note_tags (note_id, tag_id) VALUES
(1, 1), (1, 2),
(2, 2), (2, 3),
(3, 3), (3, 4),
(4, 1), (4, 4);
```

# Installation Script

Use the following Bash script to set up and run the application:

```bash
#!/bin/bash

# Installation script to set up the application

# Database configuration
echo "Configuring the database..."
mariadb -u root < database-setup.sql

# Build the backend (Java - Maven)
echo "Building the backend..."
cd backend
mvn clean install

# Set environment variables for the backend
export SPRING_DATASOURCE_URL=jdbc:mariadb://localhost:3307/ensolver_db
export SPRING_DATASOURCE_USERNAME=root
export SPRING_DATASOURCE_PASSWORD=

# Run the backend
echo "Starting the backend..."
java -jar target/notes-0.0.1-SNAPSHOT.jar &

# Build the frontend (React - Vite)
echo "Building the frontend..."
cd ../frontend
npm install

# Run the frontend
echo "Starting the frontend..."
npm run dev

```





# Backend README

This README provides information about the structure and configuration of the backend of the application.

## Project Structure

The project follows a standard Spring Boot structure with the following main packages:

- **com.ensolvers.notes.controller**: Contains controllers that handle HTTP requests and responses.

- **com.ensolvers.notes.model**: Defines domain entities, such as `Note` and `Tag`, using JPA.

- **com.ensolvers.notes.repository**: Contains repository interfaces that extend `JpaRepository` to perform database operations.

- **com.ensolvers.notes.service**: Contains service interfaces and classes that implement business logic.

## Database Configuration


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

## Frontend Implementation

In the frontend, a Single Page Application (SPA) has been implemented with routes for displaying notes, creating notes, and managing tags. 
The application allows users to view both archived and unarchived notes. 
The tagging feature has been partially implemented, enabling the assignment of tags to notes. 
However, due to time constraints and the project deadline, the full implementation of tag filtering was not completed.

