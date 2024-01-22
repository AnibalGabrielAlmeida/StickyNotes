package com.ensolvers.notes.repository;

import com.ensolvers.notes.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository <Note, Long> {


    List<Note> findByArchivedTrue();
}
