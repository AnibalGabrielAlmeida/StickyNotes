package com.ensolvers.notes.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Note {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private Boolean archived;


    @ManyToMany
    @JoinTable(
        name = "note_tags",
        joinColumns = @JoinColumn(name = "note_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();
    /*
     * Using a Set to represent the many-to-many relationship between Note and Tag.
     * A Set ensures uniqueness of tags in the list, and provides efficient performance
     * for add and lookup operations. The order of tags is generally not crucial in this context.
     */
    public Note(String title, String content, Boolean archived) {
        this.title = title;
        this.content = content;
        this.archived = archived;
        this.tags = new HashSet<>();
    }

}
