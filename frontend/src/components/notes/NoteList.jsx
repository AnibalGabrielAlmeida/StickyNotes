import React, { useState, useEffect } from "react";
import { useNoteContext } from "../../context/NoteContext"; // Import the context
import "./NoteList.css";


const NoteList = ({}) => {
  // Use functions from the context
  const { notes, fetchNotes, deleteNote, editNote, archiveNote, unarchiveNote } = useNoteContext();
 // New state to manage the note being edited
  const [editingNote, setEditingNote] = useState(null);
  // New state to manage the view mode (default is 'unarchived')
  const [viewMode, setViewMode] = useState("unarchived"); 

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleEditNote = (id) => {
    // find the note that is being edited and refresh the state
    const noteToEdit = notes.find((note) => note.id === id);
    setEditingNote(noteToEdit);
  };

  const handleCancelEdit = () => {
    // cancels the edition, restores the state and the note in edition
    setEditingNote(null);
  };

  const handleSaveEdit = async () => {
    if (editingNote) {
      // Call the edit function with the updated note
      await editNote(editingNote.id, editingNote);
      setEditingNote(null); // Clean the edit state after successful edit
    }
  };

  const handleInputChange = (e) => {
    // Update the state of the note you're editing with changes in the form
    setEditingNote({
      ...editingNote,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await deleteNote(id);

      if (response.ok) {
        console.log(`Note with id ${id} deleted successfully!`);
        fetchNotes(); // Update the list of notes after a delete
      } else {
        console.error(`Failed to delete note with id ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting note with id ${id}:`, error);
    }
  };

  const handleArchiveNote = async (id) => {
    // Call the archive function with the note to be archived
    await archiveNote(id);
    fetchNotes();
  };

  const handleUnarchiveNote = async (id) => {
    // Call the unarchive function with the note to be unarchived
    await unarchiveNote(id);
    fetchNotes();
  };

  const handleToggleViewMode = (mode) => {
    setViewMode(mode);
  };


  return (
    <div className="note-list-container">
      <h2 className="note-list-title">
        {viewMode === "archived" ? "ARCHIVED NOTES" : "NOTES"}
      </h2>
      <div className="note-list-buttons">
        {viewMode === "unarchived" && (
          <button onClick={() => handleToggleViewMode("archived")} className="toggle-button">
            Show Archived
          </button>
        )}
        {viewMode === "archived" && (
          <button onClick={() => handleToggleViewMode("unarchived")} className="toggle-button">
            Show Unarchived
          </button>
        )}
      </div>
      <ul className="note-list-ul">
        {notes
          .filter((note) => (viewMode === "archived" ? note.archived : !note.archived))
          .map((note) => (
            <li key={note.id} className="note-item">
              {editingNote && editingNote.id === note.id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editingNote.title}
                    onChange={handleInputChange}
                    className="note-input"
                  />
                  <textarea
                    name="content"
                    value={editingNote.content}
                    onChange={handleInputChange}
                    className="note-input"
                    readOnly
                  />
                  <div className="note-buttons">
                    <button onClick={handleSaveEdit} className="edit-button">
                      Save
                    </button>
                    <button onClick={handleCancelEdit} className="edit-button">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <strong>{note.title}</strong>
                  <p>{note.content}</p>
                  <div className="note-buttons">
                    <button onClick={() => handleEditNote(note.id)} className="edit-button">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteNote(note.id)} className="edit-button">
                      Delete
                    </button>
                    {note.archived ? (
                      <button onClick={() => handleUnarchiveNote(note.id)} className="edit-button">
                        Unarchive
                      </button>
                    ) : (
                      <button onClick={() => handleArchiveNote(note.id)} className="edit-button">
                        Archive
                      </button>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
  
  }
export default NoteList;
