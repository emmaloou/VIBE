import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import PostCard from '../components/PostCard';
import { getUserInfoFromToken, checkAuth } from '../auth';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    
    checkAuth();

    const userInfo = getUserInfoFromToken();
    if (!userInfo) {
      navigate('/login');
      return;
    }

    console.log('userId:', userInfo.userId);
    console.log('userPseudo:', userInfo.userPseudo);
    console.log('userRole:', userInfo.userRole);

    fetchPosts();
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/posts');
      const fetchedPosts = response.data;

      // Comme le schéma simplifié n'a plus d'informations sur l'utilisateur, 
      // nous n'avons pas besoin de valider ces données.
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Erreur lors de la récupération des posts:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-beige-50 font-more-sugar">
      <Sidebar role="user" />
      <div className="flex flex-col items-center w-full p-6">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))
        ) : (
          <p className="text-brown-700">Aucun post disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
