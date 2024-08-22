import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CitySelect from '../components/AsyncSelect';
import Sidebar from '../components/Sidebar';

const PublishPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ville, setVille] = useState(null); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/posts/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const sideLength = Math.min(img.width, img.height);
          const canvas = document.createElement('canvas');
          canvas.width = sideLength;
          canvas.height = sideLength;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(
            img,
            (img.width - sideLength) / 2,
            (img.height - sideLength) / 2,
            sideLength,
            sideLength,
            0,
            0,
            sideLength,
            sideLength
          );
          canvas.toBlob((blob) => {
            setCroppedImage(blob);
          }, 'image/jpeg');
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setCategoryIds((prevCategoryIds) =>
      prevCategoryIds.includes(categoryId)
        ? prevCategoryIds.filter((id) => id !== categoryId)
        : [...prevCategoryIds, categoryId]
    );
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleVilleChange = (selectedOption) => {
    if (selectedOption) {
      setVille(selectedOption.value.city);
    } else {
      setVille('');
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event, isDraft = false) => {
    event.preventDefault();

    const token = localStorage.getItem('token'); 

    if (!token) {
      setError("Vous n'êtes pas authentifié.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', description);
    formData.append('file', croppedImage || selectedImage);
    formData.append('status', isDraft ? 'brouillon' : 'verification');

    if (ville) {
      formData.append('ville', ville);
    }

    if (categoryIds.length > 0) {
      categoryIds.forEach(id => formData.append('category_ids', id));
    } else {
      formData.append('category_ids', 0);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      setSuccess(isDraft ? "Brouillon enregistré !" : "Publication réussie !");
      setError(null);
      console.log('Résultat:', response.data);

      // Redirection vers la page de profil après succès
      navigate(`/profile/${localStorage.getItem('username')}`); 

    } catch (error) {
      setSuccess(null);
      if (error.response && error.response.data) {
        console.error('Erreur lors de la soumission:', error.response.data);
        setError("Erreur lors de la soumission: " + error.response.data.detail);
      } else {
        console.error('Erreur inconnue:', error);
        setError("Une erreur inconnue s'est produite.");
      }
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      setError('Le nom de la catégorie ne peut pas être vide');
      return;
    }

    try {
      // Utiliser les paramètres de requête pour envoyer le nom de la nouvelle catégorie
      const response = await axios.post(`http://127.0.0.1:8000/posts/categories?category_name=${encodeURIComponent(newCategory)}`, {}, {
        headers: {
          'accept': 'application/json',
        },
      });

      console.log('Réponse de l\'ajout:', response.data);
      setCategories([...categories, response.data]); // Ajouter la nouvelle catégorie à la liste
      setNewCategory('');
      setSuccess('Catégorie ajoutée avec succès');
      setError(null);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie:', error);
      setError('Erreur lors de l\'ajout de la catégorie');
    }
  };

  return (
    <div className="font-more-sugar flex">
      <div className="fixed top-0 left-0 h-screen bg-beige-50 w-64">
        <Sidebar role="user" />
      </div>
      
      <div className="flex-grow">
        <h1 className="text-3xl text-brown-700 font-more-sugar mb-6">Publier</h1>
        <form className="bg-white p-8">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <div className="flex mb-6">
            <div>
              {croppedImage ? (
                <img src={URL.createObjectURL(croppedImage)} alt="Prévisualisation" className="w-64 h-64 object-cover rounded-lg mb-4" />
              ) : (
                selectedImage && (
                  <img src={URL.createObjectURL(selectedImage)} alt="Prévisualisation" className="w-64 h-64 object-cover rounded-lg mb-4" />
                )
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="imageUpload" />
              <label htmlFor="imageUpload" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded cursor-pointer">
                Galerie Photos
              </label>
            </div>
            <div className="ml-8 flex flex-col justify-between flex-grow">
              <div>
                <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="title">
                  Titre :
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Titre"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mt-0">
                <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="description">
                  Description :
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Description"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="city">
              Choisir une ville :
            </label>
            <CitySelect onChange={handleVilleChange} value={ville} />
          </div>
          <div className="mb-4">
            <label className="block text-brown-700 text-sm font-bold mb-2 text-left">
              Choisir des catégories :
            </label>
            <div className="flex flex-wrap">
              {categories.map((cat) => (
                <div key={cat.id} className="mr-4 mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={cat.id}
                      checked={categoryIds.includes(cat.id)}
                      onChange={() => handleCategoryChange(cat.id)}
                      className="form-checkbox h-5 w-5 text-brown-600"
                    />
                    <span className="ml-2 text-brown-700">{cat.name}</span>
                  </label>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setShowAddCategory(!showAddCategory)}
                className="ml-4 mb-2 p-2 border border-brown-700 text-brown-700 rounded hover:bg-brown-700 hover:text-white transition-colors duration-300"
              >
                +
              </button>
            </div>
            {showAddCategory && (
               <form onSubmit={handleAddCategory} className="mb-4">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Nom de la nouvelle catégorie"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
                />
                <button
                  type="submit"
                  className="ml-2 bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded"
                >
                  Ajouter
                </button>
              </form>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={(e) => handleSubmit(e, false)}
            >
              Publier
            </button>
            <button
              className="border-2 border-brown-700 text-brown-700 font-bold py-2 px-4 rounded hover:bg-brown-700 hover:text-white focus:outline-none focus:shadow-outline transition-colors duration-300"
              type="button"
              onClick={(e) => handleSubmit(e, true)}
            >
              Enregistrer comme brouillon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishPage;
