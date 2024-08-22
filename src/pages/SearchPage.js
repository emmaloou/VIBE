import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Utilisation de react-modal pour le modal
import Sidebar from '../components/Sidebar';

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        setError('Erreur lors de la récupération des catégories');
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    );
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/posts', {
        params: { categories: selectedCategories },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Erreur lors de la recherche des posts:', error);
      setError('Erreur lors de la recherche des posts');
    }
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="font-more-sugar flex">
    <div className="fixed top-0 left-0 h-screen bg-beige-50 w-64">
      <Sidebar role="user" />
    </div>
    
    <div className="flex-grow">
        <h1 className="text-3xl text-brown-700 font-more-sugar mb-6">Recherche</h1>

        <div className="mb-4">
          <h2 className="text-xl text-brown-700 mb-2">Filtrer par catégories</h2>
          {categories.map((category) => (
            <div key={category.id}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={category.name}
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                  className="form-checkbox"
                />
                <span className="ml-2">{category.name}</span>
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleSearch}
          className="bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Rechercher
        </button>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="cursor-pointer" onClick={() => openModal(post)}>
              <img
                src={post.img_URL}
                alt={post.title}
                className="rounded-md w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Modal pour afficher les détails du post */}
        {selectedPost && (
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Détails du post">
            <div className="flex flex-col md:flex-row">
              {selectedPost.img_URL && (
                <div className="md:w-1/3">
                  <img
                    src={selectedPost.img_URL}
                    alt={selectedPost.title}
                    className="rounded-md w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-4 md:w-2/3 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <a
                    href={`/profile/${selectedPost.author.pseudo}`}
                    onClick={(e) => {
                      e.preventDefault();
                      // Logique pour ouvrir le profil de l'auteur
                    }}
                    className="text-blue-500 font-bold"
                  >
                    {selectedPost.author.name} {selectedPost.author.surname}
                  </a>
                  <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {selectedPost.category || "Catégorie non spécifiée"}
                  </span>
                </div>

                <h2 className="text-2xl font-bold mb-2">
                  {selectedPost.title || "Titre non disponible"}
                </h2>
                <p className="text-gray-700 mb-2">
                  {selectedPost.showFullContent
                    ? selectedPost.content
                    : `${selectedPost.content.slice(0, 100)}...`}
                </p>
                {selectedPost.content.length > 100 && (
                  <button
                    onClick={() => {} /* Logique pour basculer le contenu complet */}
                    className="text-blue-500"
                  >
                    {selectedPost.showFullContent ? "Voir moins" : "Voir plus"}
                  </button>
                )}

                <div className="text-sm text-gray-500">
                  <p>
                    {selectedPost.nb_like + (selectedPost.isLiked ? 1 : 0)}{" "}
                    <button
                      onClick={() => {} /* Logique pour basculer le like */}
                      className="text-red-500"
                    >
                      {/* Icône de cœur */}
                    </button>
                    {selectedPost.nb_save + (selectedPost.isSaved ? 1 : 0)}{" "}
                    <button
                      onClick={() => {} /* Logique pour basculer le save */}
                      className="text-yellow-500"
                    >
                      {/* Icône de sauvegarde */}
                    </button>
                  </p>
                  <p>{selectedPost.formattedDate || "Date non spécifiée"}</p>
                </div>

                {/* Section des commentaires */}
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Commentaires :</h3>
                  <ul className="overflow-y-auto max-h-32 pr-2">
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
                </div>

                <form
                  onSubmit={() => {} /* Logique pour soumettre un commentaire */}
                  className="mt-4 flex items-center"
                >
                  <input
                    value={"" /* État du nouveau commentaire */}
                    onChange={() => {} /* Logique pour changer l'état du commentaire */}
                    placeholder="Ajouter un commentaire..."
                    className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <button
                    type="submit"
                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                  >
                    Commenter
                  </button>
                </form>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
