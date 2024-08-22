import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/posts/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        setError('Erreur lors de la récupération des catégories');
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      setError('Le nom de la catégorie ne peut pas être vide');
      return;
    }

    try {
      // Utiliser les paramètres de requête pour envoyer le nom de la nouvelle catégorie
      const response = await axios.post('http://127.0.0.1:8000/posts/categorie', null, {
        params: { category_name: newCategory },
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
    console.error('Erreur lors de l\'ajout de la catégorie:', error.response ? error.response.data : error.message);
    setError(error.response ? error.response.data.detail : 'Erreur lors de l\'ajout de la catégorie');
    }
  };

  return (
    <div className="flex min-h-screen bg-beige-50 font-more-sugar">
      <Sidebar role="admin" />
      <div className="flex flex-col w-full p-8">
        <h1 className="text-3xl text-brown-700 font-more-sugar mb-6">Catégories</h1>

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

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <ul className="list-disc pl-5">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} className="mb-2 text-brown-700">
                {category.name}
              </li>
            ))
          ) : (
            <p>Aucune catégorie disponible.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesPage;
