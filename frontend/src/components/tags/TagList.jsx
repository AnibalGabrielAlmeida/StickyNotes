import React from 'react';
import { useTagContext } from '../../context/TagContext';
import './TagList.css';

const TagList = () => {
  const { tags, removeTag } = useTagContext();

  return (
    <div className="tag-list-container">
      <h2 className="tag-list-title">Tag List</h2>
      <ul className="tag-list">
        {tags.map((tag) => (
          <li key={tag.id} className="tag-list-item">
            {tag.name}
            <button className="remove-tag-button" onClick={() => removeTag(tag.id)}>
              Remove Tag
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default TagList;
