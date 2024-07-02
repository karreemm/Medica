import React, { useEffect } from 'react';

export default function Logout() {
  

    localStorage.removeItem('token');
    localStorage.removeItem('User');

    window.location.href = '/';
  

  // Render nothing
  return null;
}