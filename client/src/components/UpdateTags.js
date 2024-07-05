import React, { useState } from 'react';
import axios from 'axios';

const UpdateTagsForm = ({ photoId, currentTags, onUpdate }) => {
  const [newTags, setNewTags] = useState(currentTags);

  const handleUpdateTags = async () => {
    try {
      await axios.post(`http://localhost:4000/photos/${photoId}/tags`, { tags: newTags });
      onUpdate(photoId, newTags);
    } catch (error) {
      console.error('Error updating tags', error);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleUpdateTags(); }} className="update-tags-form">
      <input
        type="text"
        value={newTags}
        onChange={(e) => setNewTags(e.target.value)}
        placeholder="Update Tags"
        className="tag-input"
      />
      <button type="submit">Update Tags</button>
    </form>
  );
};

export default UpdateTagsForm;
