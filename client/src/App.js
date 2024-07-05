import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Gallery from './components/Gallery';
import { UserContext } from './UserContext/UserContext';
import UploadForm from './components/UploadForm';
import Search from './components/Search';
import Logout from './components/logout';
import Navbar from './components/Navbar';


function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/gallery" element={user ? <Gallery /> : <Navigate to="/" />} />
        <Route path="/upload" element={user ? <UploadForm /> : <Navigate to="/" />} />
        <Route path="/search" element={user ? <Search /> : <Navigate to="/" />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
