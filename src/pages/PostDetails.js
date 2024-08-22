// src/pages/PostDetails.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const PostDetails = () => {
  const navigate = useNavigate();

  const userRole = 'admin';
  
  const post = {
    user: { name: 'Nom Prénom', username: 'pseudo' },
    title: 'Titre',
    location: 'Ville, Pays',
    description: 'Début de la description ... voir plus',
    date: 'XX/XX/202X',
    likes: 100,
    category: 'Catégorie',
    comments: [
      { username: 'pseudo1', text: 'Commentaire 1', interactions: 'Commentaires, réactions et interactions' },
      { username: 'pseudo2', text: 'Commentaire 2', interactions: 'Commentaires, réactions et interactions' },
      // Ajoutez plus de commentaires si nécessaire
    ],
  };

  return (
    <div className="flex min-h-screen bg-beige-50 font-more-sugar">
    {/* Sidebar Fixe à gauche */}
    <div className="fixed top-0 left-0 w-64 h-screen bg-beige-50">
      <Sidebar role="user" />
    </div>
    
    {/* Contenu de la page sans marges inutiles */}
    <div className="flex flex-col items-start w-full  p-2">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate(-1)} className="mr-4 text-brown-700">
            <span className="material-icons">arrow_back</span>
          </button>
          <button className="bg-transparent border border-gray-800 rounded-full py-1 px-3 text-gray-800">
            {post.category}
          </button>
        </div>
        <div className="flex">
          <div className="flex-1">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                <div className="ml-4">
                  <div className="font-bold text-gray-800">{post.user.name}</div>
                  <div className="text-gray-600">@{post.user.username}</div>
                </div>
                <button className="ml-auto bg-transparent border border-gray-800 rounded-full py-1 px-3 text-gray-800">
                  ...
                </button>
              </div>
              <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
              <div className="text-lg font-bold text-gray-800">{post.title}</div>
              <div className="text-gray-600 mb-4">[{post.location}]</div>
              <div className="text-gray-800 mb-4">{post.description}</div>
              <div className="text-gray-600 mb-4"> {post.date}</div>
            </div>
          </div>
          <div className="w-1/3 pl-6">
            {post.comments.map((comment, index) => (
              <div key={index} className="flex items-start mb-4">
                <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                <div className="ml-4">
                  <div className="text-gray-600">@{comment.username}</div>
                  <div className="text-gray-800">{comment.text}</div>
                  <div className="text-gray-600">{comment.interactions}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
