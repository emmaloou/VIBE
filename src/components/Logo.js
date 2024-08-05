// src/components/Logo.js
import React from 'react';
import logo from '../assets/logo.png';

const Logo = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <img src={logo} alt="Vibe logo" className="h-192 w-auto" />
    </div>
  );
}

export default Logo;
