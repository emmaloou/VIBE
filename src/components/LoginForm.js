// src/components/LoginForm.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = 'pseudo'; // Récupérez le nom d'utilisateur de votre formulaire ou API
    localStorage.setItem('username', username);
    navigate(`/profile/${username}`);
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl mb-6 text-left text-brown-700 font-more-sugar">Connexion</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
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
          />
        </div>
        <div className="mb-6">
          <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="password">
            Mot de passe :
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-brown-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe"
          />
          <a className="inline-block align-baseline font-bold text-sm text-brown-500 hover:text-brown-800 text-left" href="#">
            Mot de passe oublié ?
          </a>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Se connecter
          </button>
        </div>
      </form>
      <div className="mt-4 text-left">
        <Link to="/signup" className="text-brown-500 hover:text-brown-800">
          Pas encore inscrit ? Créez un compte
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
