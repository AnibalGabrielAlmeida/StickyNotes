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
            await fetchNotes();//  reflect the new note
             
          } else {
            console.error("Failed to create note");
          }
        } catch (error) {
          console.error("Error creating note:", error);
        }
      };
  
      return (
        <div className="centered-form">
          <h2 className="note-form-title">NOTE CREATION</h2>
          <form onSubmit={handleSubmit} className="centered-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                placeholder="Enter new title"
                className="note-input"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content" className="form-label">
                Content:
              </label>
              <textarea
                type="text"
                id="content"
                value={content}
                placeholder="Enter content"
                className="note-input"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <br />
            <button type="submit" className="submit-button">
              Create Note
            </button>
          </form>
        </div>
      );
      
    };
export default NoteForm;
