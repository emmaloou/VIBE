// src/pages/ModerationPage.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { getToken } from '../auth';

const ModerationPage = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPostToModerate = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/moderate/');
        setPost(response.data);
      } catch (err) {
        setError("Aucun post à modérer pour le moment.");
      }
    };

    fetchPostToModerate();
  }, []);

  const handleModeration = async (isAccepted) => {
    try {
      await axios.post(`http://127.0.0.1:8000/moderate/${post.id}`, null, {
        params: { ok: isAccepted },
        headers: {
          'Authorization': `Bearer ${getToken()}`, // Ajouter l'authentification si nécessaire
        },
      });
      setPost(null); // Post modéré, retirez-le de l'affichage
      alert(isAccepted ? 'Post accepté.' : 'Post refusé.');
      navigate('/moderation');
    } catch (err) {
      setError("Erreur lors de la modération du post.");
    }
  };

  const handleBackToDashboard = () => {
    navigate('/moderation');
  };

  if (error) {
    return (
      <div className="flex min-h-screen bg-beige-50 font-more-sugar">
        <Sidebar role="moderator" />
        <div className="flex flex-col items-center justify-center w-full p-8">
          <h2 className="text-2xl text-brown-700 font-more-sugar mb-4">{error}</h2>
          <button
            onClick={handleBackToDashboard}
            className="bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen bg-beige-50 font-more-sugar">
        <Sidebar role="moderator" />
        <div className="flex flex-col items-center justify-center w-full p-8">
          <h2 className="text-2xl text-brown-700 font-more-sugar mb-4">Aucun post Ã  modÃ©rer pour le moment.</h2>
          <button
            onClick={handleBackToDashboard}
            className="bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-beige-50 font-more-sugar">
      <Sidebar role="moderator" />
      <div className="flex flex-col w-full p-8">
        <h1 className="text-3xl text-brown-700 font-more-sugar mb-6">Espace modÃ©rateur</h1>
        <div className="flex">
          <div className="w-2/3">
            <div className="bg-gray-300 h-64 rounded-lg mb-4">
              <img src={post.img_URL} alt="Post Ã  modÃ©rer" className="w-full h-full object-cover rounded-lg" />
            </div>
            <p>Post de {post.author_id} (@{post.author_id})</p>
            <p>Date : {new Date(post.created_at).toLocaleDateString()}</p>
          </div>
          <div className="w-1/3 ml-4">
            <h2 className="text-xl text-brown-700 font-more-sugar mb-4">{post.title}</h2>
            <p className="bg-gray-200 p-4 rounded-lg">{post.content}</p>
            {/* <p className="bg-gray-200 p-4 rounded-lg mt-4">CatÃ©gories : {post.categories.map(cat => cat.name).join(', ')}</p> */}
            <div className="mt-4 flex">
            <button onClick={() => handleModeration(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4">Accepter</button>
              <button onClick={() => handleModeration(false)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Refuser</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModerationPage;
