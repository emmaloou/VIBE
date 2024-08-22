import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { checkAuth, getUserInfoFromToken, getToken } from '../auth';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();

    const fetchUserProfile = async () => {
      try {
        const token = getToken();
        const userInfo = getUserInfoFromToken();

        const userResponse = await axios.get('http://127.0.0.1:8000/users/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const userProfile = userResponse.data;
        setUser(userProfile);

        setIsOwnProfile(userProfile.id === userInfo.userId);

        const postsResponse = await axios.get(`http://127.0.0.1:8000/posts/user/${userProfile.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const filteredPosts = userProfile.id === userInfo.userId 
          ? postsResponse.data
          : postsResponse.data.filter(post => post.status === 'publie');

        setPosts(filteredPosts);

      } catch (err) {
        setError("Erreur lors de la récupération des informations de l'utilisateur");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleImageClick = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setNewComment('');
  };

  const handleArchivePost = async (postId) => {
    const confirmArchive = window.confirm("Êtes-vous sûr de vouloir archiver cette publication ?");
    if (confirmArchive) {
      try {
        const token = getToken();
        await axios.patch(`http://127.0.0.1:8000/posts/${postId}/`, {
          status: 'archive'
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setPosts(posts.map(post => 
          post.id === postId ? { ...post, status: 'archive' } : post
        ));
        setSelectedPost(null); 
      } catch (err) {
        console.error("Erreur lors de l'archivage de la publication:", err);
        alert("Une erreur s'est produite lors de l'archivage. Veuillez réessayer.");
      }
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const token = getToken();
      const response = await axios.post(`http://127.0.0.1:8000/posts/${selectedPost.id}/comments`, {
        text: newComment
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const updatedComments = [...selectedPost.comments, response.data];
      setSelectedPost({ ...selectedPost, comments: updatedComments });
      setNewComment('');
    } catch (err) {
      console.error("Erreur lors de l'ajout du commentaire:", err);
      alert("Une erreur s'est produite lors de l'ajout du commentaire. Veuillez réessayer.");
    }
  };

  const getStatusBannerColor = (status) => {
    switch (status) {
      case 'brouillon':
        return 'bg-gray-500';
      case 'verification':
        return 'bg-blue-500';
      case 'publie':
        return 'bg-green-500';
      case 'archive':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>Utilisateur non trouvé</div>;

  return (
    <div className="flex min-h-screen bg-beige-50 font-more-sugar">
      {/* Sidebar Fixe à gauche */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-beige-50">
        <Sidebar role="user" />
      </div>
      
      {/* Contenu de la page sans marges inutiles */}
      <div className="flex flex-col items-start w-full  p-2">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-2xl">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-gray-300 h-20 w-20"></div>
            <div className="ml-4">
              <div className="font-bold text-gray-800 text-xl">{user.name}</div>
              <div className="text-gray-600">@{user.pseudo}</div>
              <div className="text-gray-800 mt-2">{user.description || "Aucune biographie disponible"}</div>
              <div className="text-gray-600">{user.nextDestination || "Pas de prochaine destination"}</div>
            </div>
          </div>
          <div className="text-gray-800 mt-4">{posts.length} publications</div>
        </div>
        {/* Affichage des publications */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {posts.map((post, index) => (
              <div key={index} className="relative cursor-pointer" onClick={() => handleImageClick(post)}>
                <img
                  src={post.img_URL}
                  alt={post.title}
                  className="object-cover w-full h-64 rounded-lg"
                />
                {isOwnProfile && (
                  <div className={`absolute top-0 left-0 p-2 text-white text-sm ${getStatusBannerColor(post.status)} rounded-tl-lg rounded-br-lg`}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600 text-lg">Pas de publications</div>
        )}
      </div>
      
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-4xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="flex">
              <img src={selectedPost.img_URL} alt={selectedPost.title} className="w-1/2 rounded-md" />
              <div className="w-1/2 pl-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-bold mb-4">{selectedPost.title}</h2>
                {isOwnProfile && (
                  <button
                    className="bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    onClick={() => handleArchivePost(selectedPost.id)}
                  >
                    Archiver
                  </button>
                )}
                </div>
                <p className="text-gray-700 mb-4">{selectedPost.content}</p>
                <div className="text-sm text-gray-500">
                  <p>Posté par: {user.name} ({user.pseudo})</p>
                  <p>Catégorie: {selectedPost.category_name || "Non spécifiée"}</p>
                  <p>Le: {selectedPost.created_at || "Date non spécifiée"}</p>
                  <p>Status: {selectedPost.status}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-2">Commentaires</h3>
                  <ul>
                    {selectedPost.comments && selectedPost.comments.length > 0 ? (
                      selectedPost.comments.map((comment, index) => (
                        <li key={index} className="border-b border-gray-200 py-2">
                          <p>{comment.text}</p>
                          <p className="text-xs text-gray-500">- {comment.author}</p>
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500">Aucun commentaire disponible.</p>
                    )}
                  </ul>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 mt-4"
                  ></textarea>
                  <button
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                    onClick={handleAddComment}
                  >
                    Ajouter un commentaire
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
