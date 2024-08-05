// src/components/SignupForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    consent: false,
  });

  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas.');
      return;
    }
    setPasswordError('');
    const username = formData.username; // Récupérez le nom d'utilisateur de votre formulaire ou API
    localStorage.setItem('username', username);
    navigate(`/profile/${username}`);
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl mb-6 text-left text-brown-700 font-more-sugar">Inscription</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="firstName">
            Prénom :
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-brown-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="lastName">
            Nom :
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-brown-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="username">
            Pseudo :
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-brown-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            placeholder="Pseudo"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="email">
            Mail :
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-brown-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="password">
            Mot de passe :
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-brown-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="confirmPassword">
            Confirmation du mot de passe :
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-brown-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirmation du mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {passwordError && <p className="text-red-500 text-xs italic mb-4 text-left">{passwordError}</p>}
        <div className="mb-4">
          <label className="inline-flex items-center text-left">
            <input
              className="form-checkbox"
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            <span className="ml-2 text-brown-700 text-sm">
              J'accepte les <Link to="/terms" className="text-brown-500 hover:text-brown-800">conditions générales d'utilisation</Link>
            </span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            S'inscrire
          </button>
        </div>
      </form>
      <div className="mt-4 text-left">
        <Link to="/login" className="text-brown-500 hover:text-brown-800">
          Déjà inscrit ? Connectez-vous
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
