import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../auth';

const Demos = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saveCount, setSaveCount] = useState(0);
  
  const postId = 1; 

  const token = getToken();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        
        const likeCountResponse = await axios.get(`http://127.0.0.1:8000/like/count/${postId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setLikeCount(likeCountResponse.data);

        
        const saveCountResponse = await axios.get(`http://127.0.0.1:8000/save/count/${postId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setSaveCount(saveCountResponse.data);

        
        const likedPostsResponse = await axios.get(`http://127.0.0.1:8000/liked`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setLiked(likedPostsResponse.data.some(post => post.id === postId));

        
        const savedPostsResponse = await axios.get(`http://127.0.0.1:8000/saved`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setSaved(savedPostsResponse.data.some(post => post.id === postId));

      } catch (err) {
        console.error("Erreur lors de la récupération des données.", err);
      }
    };

    fetchPostData();
  }, [postId, token]);

  const handleLikeToggle = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/liker', {
        post_id: postId,
        dir: liked ? 0 : 1
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    } catch (err) {
      console.error("Erreur lors de la mise à jour du like.", err);
    }
  };

  const handleSaveToggle = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/save', {
        post_id: postId,
        dir: saved ? 0 : 1
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSaved(!saved);
      setSaveCount(saved ? saveCount - 1 : saveCount + 1);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'enregistrement.", err);
    }
  };

  return (
    <div className="post-page">
      <h1>Post ID: {postId}</h1>

      <div>
        <button onClick={handleLikeToggle}>
          {liked ? 'Unlike' : 'Like'} ({likeCount})
        </button>
        <button onClick={handleSaveToggle}>
          {saved ? 'Unsave' : 'Save'} ({saveCount})
        </button>
      </div>
    </div>
  );
};

export default Demos;
