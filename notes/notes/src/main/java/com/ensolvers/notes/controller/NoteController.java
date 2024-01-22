package com.ensolvers.notes.controller;


import com.ensolvers.notes.model.Note;
import com.ensolvers.notes.service.INoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/note")
public class NoteController {

    @Autowired
    private INoteService noteService;

    /* Utilizing ResponseEntity for custom error handling. ResponseEntity provides precise control
     * over HTTP response details, allowing consistent error messages and status codes in the API.
     * Planning to enhance error and exception handling in the future.*/

    @PostMapping("/create")
    public ResponseEntity<Void> createNote(@RequestBody Note note) {
        noteService.createNote(note);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Note>> getAllNotes() {
        List<Note> notes = noteService.getAllNotes();
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Note note = noteService.findById(id);
        return note != null
                ? new ResponseEntity<>(note, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note updateNote) {
        Note updatedNote = noteService.updateNote(id, updateNote);
        return updatedNote != null
                ? new ResponseEntity<>(updatedNote, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteNoteById(@PathVariable Long id) {
        noteService.deleteNoteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
