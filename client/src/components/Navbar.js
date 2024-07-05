// client/src/components/Navbar.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <nav>
          <Link to="/gallery">Gallery</Link>
      <Link to="/upload">Upload</Link>
  
      <Link to="/search">Search</Link>
      {user ? (
        <Link to="/logout">Logout</Link>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;
