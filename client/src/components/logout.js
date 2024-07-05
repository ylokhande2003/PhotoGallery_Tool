
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';

function Logout() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session and redirect to login
    setUser(null);
    navigate('/login');
  }, [setUser, navigate]);

  return null;
}

export default Logout;
