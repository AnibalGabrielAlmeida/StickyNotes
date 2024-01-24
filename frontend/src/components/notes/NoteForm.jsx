// components/notes/NoteForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../../context/NoteContext"; // Import useNoteContext
import "./NoteForm.css";

const NoteForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const { createNote, fetchNotes } = useNoteContext();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await createNote({
          title,
          content,
        });
  
        // Check if the note was created successfully
        if (response && response.ok) {
            console.log("Note created successfully!");
            await fetchNotes(); // Wait for notes to update
            setTitle(""); // Clear the title after creating the note
            setContent(""); // Clear the content after creating the note
            window.location.reload(); // Reload the page to reflect the new note
          } else {
            console.error("Failed to create note");
          }
        } catch (error) {
          console.error("Error creating note:", error);
        }
      };
  
    return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Create Note</button>
    </form>
  );
};

export default NoteForm;
