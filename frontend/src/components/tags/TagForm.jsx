import React, { useState } from 'react';
import { useTagContext } from '../../context/TagContext';
import './TagForm.css';

const TagForm = () => {
  const { addTag } = useTagContext();
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      addTag(newTag);
      setNewTag('');
    }
  };

  return (
    <div className="tag-form-container">
      <h2 className="tag-form-title">TAG CREATION</h2>
      <div className="tag-input-container">
        <input
          type="text"
          placeholder="Enter new tag"
          className="tag-input"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button className="tag-button" onClick={handleAddTag}>
          Add Tag
        </button>
      </div>
    </div>
  );
  
};

export default TagForm;
