package com.ensolvers.notes.service;

import com.ensolvers.notes.model.Note;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface INoteService {
    //Create
    public void createNote(Note note);

    //Read
    public List<Note> getAllNotes();
    public Note findById(Long id);

    //Update
    public Note updateNote(Long id, Note updateNote);

    //Delete
    public void deleteNoteById(Long id);

    void archiveNoteById(Long id);

    void unarchiveNoteById(Long id);

    List<Note> getArchivedNotes();


    /*---------check----------*/
    public Note addTagsToNote(Long noteId, List<Long> tagIds);


    public Note updateTagsOfNote(Long noteId, List<Long> tagIds);

    Note removeTagsFromNote(Long noteId, List<Long> tagIds);

    List<Note> getNotesByTags(List<Long> tagIds);
}
