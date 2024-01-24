import React, { createContext, useContext, useState, useEffect } from 'react';

const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTags = async () => {
    try {
      const response = await fetch('http://localhost:8080/tag/list');
      if (response.ok) {
        const data = await response.json();
        setTags(data);
      } else {
        console.error('Failed to fetch tags');
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const addTag = async (tagName) => {
    try {
      const response = await fetch('http://localhost:8080/tag/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: tagName }),
      });

      if (response.ok) {
        console.log('Tag created successfully!');
        await fetchTags(); // Fetch tags after successful creation
      } else {
        console.error('Failed to create tag');
      }

      return response;
    } catch (error) {
      console.error('Error creating tag:', error);
      throw error;
    }
  };

  const removeTag = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/tag/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Tag ${id} deleted successfully!`);
        await fetchTags(); // Fetch tags after successful deletion
      } else {
        console.error(`Failed to delete tag ${id}`);
      }

      return response;
    } catch (error) {
      console.error(`Error deleting tag ${id}:`, error);
      throw error;
    }
  };

  return (
    <TagContext.Provider value={{ tags, loading, addTag, removeTag, fetchTags }}>
      {children}
    </TagContext.Provider>
  );
};

export const useTagContext = () => {
  return useContext(TagContext);
};
