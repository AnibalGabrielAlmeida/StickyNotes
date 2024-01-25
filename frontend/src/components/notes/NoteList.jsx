import React, { useState, useEffect } from "react";
import { useNoteContext } from "../../context/NoteContext";
import { useTagContext } from "../../context/TagContext";
import "./NoteList.css";

const NoteList = () => {
  const { notes, fetchNotes, deleteNote, editNote, archiveNote, unarchiveNote, filterNotesByTags } = useNoteContext();
  const { tags } = useTagContext();
  const [editingNote, setEditingNote] = useState(null);
  const [viewMode, setViewMode] = useState("unarchived");
  const [selectedTag, setSelectedTag] = useState("");
  const [showTagSelect, setShowTagSelect] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleTagSelection = (tagId) => {
    setSelectedTag(tagId);
  };

  const handleFilterNotes = async () => {
    if (selectedTag) {
      try {
        console.log("Filtering notes...");
        await filterNotesByTags([selectedTag]);
        console.log("Filtered notes:", notes);
      } catch (error) {
        console.error("Error filtering notes:", error);
      }
    }
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setEditingNote(noteToEdit);
    setShowTagSelect(true);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setShowTagSelect(false);
  };

  const handleSaveEdit = async () => {
    if (editingNote) {
      await editNote(editingNote.id, { ...editingNote, tagId: selectedTag });
      setEditingNote(null);
      setShowTagSelect(false);
    }
  };

  const handleInputChange = (e) => {
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
        fetchNotes();
      } else {
        console.error(`Failed to delete note with id ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting note with id ${id}:`, error);
    }
  };

  const handleArchiveNote = async (id) => {
    await archiveNote(id);
    fetchNotes();
  };

  const handleUnarchiveNote = async (id) => {
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
      <div className="tag-filter-container">
        <label htmlFor="tagFilter">Tags Filter:</label>
        <select
          id="tagFilter"
          value={selectedTag || ""}
          onChange={(e) => handleTagSelection(e.target.value)}
        >
          <option value="" disabled>Select Tag</option>
          {tags && tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <button id="filterButton" onClick={handleFilterNotes}>
          Filter
        </button>
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
                    {showTagSelect && (
                      <select
                        value={selectedTag || ""}
                        onChange={(e) => handleTagSelection(e.target.value)}
                      >
                        <option value="" disabled>Select Tag</option>
                        {tags && tags.map((tag) => (
                          <option key={tag.id} value={tag.id}>
                            {tag.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <strong>{note.title}</strong>
                  <p>{note.content}</p>
                  {note.tagNames && (
                    <p>Tags: {note.tagNames.join(", ")}</p>
                  )}
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
  
};

export default NoteList;
