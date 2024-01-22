package com.ensolvers.notes.service;

import com.ensolvers.notes.model.Note;
import com.ensolvers.notes.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteServiceImpl implements INoteService {
    @Autowired
    NoteRepository noteRepository;
    @Override
    public void createNote(Note note) {
        noteRepository.save(note);
    }

    @Override
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    @Override
    public Note findById(Long id) {
        return noteRepository.findById(id).orElse(null);
    }

    @Override
    public Note updateNote(Long id, Note updateNote) {
        Note note = noteRepository.findById(id).orElse(null);
        if (note != null){
            note.setTitle(updateNote.getTitle());
            note.setContent(updateNote.getContent());
            note.setArchived(updateNote.getArchived());
            return noteRepository.save(note);
        }
        throw new RuntimeException("Note not found with id: " + id);
    }

    @Override
    public void deleteNoteById(Long id) {
        noteRepository.deleteById(id);
    }


    @Override
    public List<Note> getArchivedNotes() {
        return noteRepository.findByArchivedTrue();
    }


    @Override
    public void archiveNoteById(Long id) {
        Note note = noteRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Note not found with id: " + id)
        );

        note.setArchived(true);
        noteRepository.save(note);
    }

    @Override
    public void unarchiveNoteById(Long id) {
        Note note = noteRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Note not found with id: " + id)
        );

        note.setArchived(false);
        noteRepository.save(note);
    }



}
