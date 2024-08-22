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

      // Filtrer les posts pour ne garder que ceux avec un statut "publié"
      const publishedPosts = fetchedPosts.filter(post => post.status === 'publie');
      setPosts(publishedPosts);
    } catch (error) {
      console.error('Erreur lors de la récupération des posts:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-beige-50 font-more-sugar">
      {/* Sidebar Fixe à gauche */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-beige-50">
        <Sidebar role="user" />
      </div>
      
      {/* Contenu de la page sans marges inutiles */}
      <div className="flex flex-col items-start w-full  p-2">
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
