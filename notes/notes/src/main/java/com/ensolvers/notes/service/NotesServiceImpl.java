package com.ensolvers.notes.service;

import com.ensolvers.notes.model.Note;
import com.ensolvers.notes.repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotesServiceImpl implements INotesService {
    @Autowired
    NotesRepository notesRepository;
    @Override
    public void createNote(Note note) {
        notesRepository.save(note);
    }

    @Override
    public List<Note> getAllNotes() {
        return notesRepository.findAll();
    }

    @Override
    public Note findById(Long id) {
        return notesRepository.findById(id).orElse(null);
    }

    @Override
    public Note updateNote(Long id, Note updateNote) {
        Note note = notesRepository.findById(id).orElse(null);
        if (note != null){
            note.setTitle(updateNote.getTitle());
            note.setContent(updateNote.getContent());
            note.setArchived(updateNote.getArchived());
        }
        return notesRepository.save(note);
    }

    @Override
    public void deleteNoteById(Long id) {
        notesRepository.deleteById(id);
    }
}
