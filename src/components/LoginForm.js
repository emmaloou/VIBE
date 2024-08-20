// src/components/LoginForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', email); 
    formData.append('password', password);

    try {
      const response = await axios.post('http://127.0.0.1:8000/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

       
       const accessToken = response.data.access_token;

      //  const decodedToken =  jwtDecode(accessToken);
      //  const { user_id, user_pseudo, user_role } = decodedToken;

      
      localStorage.setItem('token', accessToken);
      // localStorage.setItem('user_id', user_id);
      // localStorage.setItem('user_pseudo', user_pseudo);
      // localStorage.setItem('user_role', user_role);

      // Rediriger l'utilisateur vers la page de profil
      navigate(`/`);
    } catch (error) {
      setError("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl mb-6 text-left text-brown-700 font-more-sugar">Connexion</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
