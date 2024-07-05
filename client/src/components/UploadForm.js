import React, { useState,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css';
import { UserContext } from '../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

function UploadForm() {
  const [photo, setPhoto] = useState(null);
  const [tags, setTags] = useState('');
  const {  user} = useContext(UserContext);// Replace with actual user ID
  const navigate = useNavigate();
  // console.log(user);
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('tags', tags);
    formData.append('user_id', user);

    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response.data);
      navigate('/gallery');
    } catch (error) {
      console.error('Error uploading photo', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <label>file</label><input type="file" onChange={handleFileChange} required />
      <label>Tags:</label><input type="text" value={tags} onChange={handleTagsChange} placeholder="Tags (comma-separated)" required />
      <button type="submit">Upload Photo</button>

    </form>
  );
}

export default UploadForm;
