import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';
import UpdateTags from './UpdateTags';
import '../styles.css';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/photos/${user}`);
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos', error);
      }
    };

    if (user) {
      fetchPhotos();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        await axios.delete(`http://localhost:4000/photos/${id}`);
        setPhotos(photos.filter(photo => photo.id !== id));
      } catch (error) {
        console.error('Error deleting photo', error);
      }
    }
  };

  const handleUpdate = (photoId, newTags) => {
    const updatedPhotos = photos.map(photo =>
      photo.id === photoId ? { ...photo, tags: newTags } : photo
    );
    setPhotos(updatedPhotos);
  };

  return (
    <div>
      <h2>Photo Gallery</h2>
      <div className="gallery">
        {photos.map(photo => (
          <div key={photo.id} className="photo">
            <img
              src={`http://localhost:4000/photos/image/${photo.id}`}
              alt="Photo"
              style={{ width: '100%', height: '200px' }}
            />
            <p>{photo.tags}</p>
           <UpdateTags
              photoId={photo.id}
              onUpdate={handleUpdate}
            />
            <button type='submit' className="delete-button" onClick={() => handleDelete(photo.id)}>Delete Photo</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
