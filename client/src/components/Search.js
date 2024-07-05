import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';
import UpdateTags from './UpdateTags';

function Search() {
  const [tags, setTags] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [photos, setPhotos] = useState([]);
  const [newTags, setNewTags] = useState('');
  const { user } = useContext(UserContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:4000/search', {
        params: {
          user_id: user,
          tags,
          startDate,
          endDate,
        },
      });
      setPhotos(response.data);
    } catch (error) {
      console.error('Search error', error);
    }
  };

  // const handleUpdateTags = async (photoId) => {
  //   try {
  //     await axios.post(`http://localhost:4000/photos/${photoId}/tags`, { tags: newTags });
  //     const updatedPhotos = photos.map(photo => photo.id === photoId ? { ...photo, tags: newTags } : photo);
  //     setPhotos(updatedPhotos);
  //     setNewTags('');
  //   } catch (error) {
  //     console.error('Error updating tags', error);
  //   }
  // };
  
  const handleUpdate = (photoId, newTags) => {
    const updatedPhotos = photos.map(photo =>
      photo.id === photoId ? { ...photo, tags: newTags } : photo
    );
    setPhotos(updatedPhotos);
  };

  return (
    <div>
      <h2>Search Photos</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Tags:</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>

      <div className="gallery">
        {photos.map(photo => (
          <div key={photo.id} className="photo">
            <img
              src={`http://localhost:4000/photos/image/${photo.id}`}
              alt="Photo"
              style={{ width: '50%', height: 'auto' }}
            />
            <p>{photo.tags}</p>
            <UpdateTags
              photoId={photo.id}
              onUpdate={handleUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
