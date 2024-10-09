// src/Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setUserRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session data
    localStorage.removeItem('loginId');
    setUserRole(null); // Clear the user role

    // Redirect to home page
    navigate('/');
  }, [navigate, setUserRole]);

  return null;
};

export default Logout;
