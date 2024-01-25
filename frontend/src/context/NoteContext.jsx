import { createContext, useContext, useState } from 'react';

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:8080/note/list');
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        console.error('Failed to fetch notes');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const createNote = async (newNote) => {
    try {
      const response = await fetch('http://localhost:8080/note/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      // manage a not ok propertie in response
      if (response && response.ok) {
        console.log('Note created successfully!');
        fetchNotes();
      } else {
        console.error('Failed to create note');
      }

      // returns the response and manage it in noteform.jsx
      return response;
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/note/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Note with id ${id} deleted successfully!`);
        fetchNotes();
      } else {
        console.error(`Failed to delete note with id ${id}`);
      }

      return response;
    } catch (error) {
      console.error(`Error deleting note with id ${id}:`, error);
      throw error;
    }
  };

  const editNote = async (id, updatedNote) => {
    try {
      const response = await fetch(`http://localhost:8080/note/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });

      if (response.ok) {
        console.log(`Note with id ${id} edited successfully!`);
        fetchNotes();
      } else {
        console.error(`Failed to edit note with id ${id}`);
      }

      return response;
    } catch (error) {
      console.error(`Error editing note with id ${id}:`, error);
      throw error;
    }
  };

  const archiveNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/note/archive/${id}`, {
        method: 'PUT',
      });

      if (response.ok) {
        console.log(`Note with id ${id} archived successfully!`);
        fetchNotes();
      } else {
        console.error(`Failed to archive note with id ${id}`);
      }

      return response;
    } catch (error) {
      console.error(`Error archiving note with id ${id}:`, error);
      throw error;
    }
  };

  const unarchiveNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/note/unarchive/${id}`, {
        method: 'PUT',
      });

      if (response.ok) {
        console.log(`Note with id ${id} unarchived successfully!`);
        fetchNotes();
      } else {
        console.error(`Failed to unarchive note with id ${id}`);
      }

      return response;
    } catch (error) {
      console.error(`Error unarchiving note with id ${id}:`, error);
      throw error;
    }
  };

  const updateNoteTags = async (id, tagId) => {
    try {
      const response = await fetch(`http://localhost:8080/note/updateTags/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([tagId]), // Envía un array de tagIds directamente
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update tags for note with id ${id}`);
      }
  
      // Devuelve la nota actualizada desde el servidor
      return await response.json();
    } catch (error) {
      console.error("Error updating note tags:", error);
      throw error;
    }
  };

  const filterNotesByTags = async (tagIds) => {
    try {
      const response = await fetch(`http://localhost:8080/note/filterByTags?tagIds=${tagIds.join(",")}`);
      
      if (!response.ok) {
        throw new Error(`Failed to filter notes by tags: ${tagIds}`);
      }
  
      // Devuelve las notas filtradas desde el servidor
      const filteredNotes = await response.json();
      setNotes(filteredNotes);
    } catch (error) {
      console.error("Error filtering notes by tags:", error);
      // Devuelve un array vacío en caso de error
      return [];
    }
  };
  
  return (
    <NoteContext.Provider value={{ notes, fetchNotes, createNote, 
    deleteNote, editNote, archiveNote, unarchiveNote, updateNoteTags, filterNotesByTags }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  return useContext(NoteContext);
};
