package com.ensolvers.notes.repository;

import com.ensolvers.notes.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotesRepository extends JpaRepository <Note, Long> {
}
