// src/pages/SignupPage.js
import React from 'react';
import SignupForm from '../components/SignupForm';
import Logo from '../assets/logo.png';

const SignupPage = () => {
  return (
    <div className="flex min-h-screen bg-beige-50 font-more-sugar">
      <div className="flex flex-col justify-center items-center w-1/2 p-8">
        <img src={Logo} alt="Vibe logo" className="w-2/3 h-auto" />
      </div>
      <div className="flex flex-col justify-center items-center w-1/2 p-8">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
