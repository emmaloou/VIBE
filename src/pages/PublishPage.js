// src/pages/PublishPage.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import CitySelect from '../components/AsyncSelect';
import categoriesData from '../data/categories.json';

const PublishPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [city, setCity] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Charger les catégories depuis le fichier JSON
    setCategories(categoriesData);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCityChange = (selectedOption) => {
    const { address } = selectedOption;
    const formattedCity = `${address.city}, ${address.postcode}, ${address.country}`;
    setCity({ value: formattedCity, label: formattedCity });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logique pour envoyer les données de publication
    console.log({ selectedImage, category, city: city ? city.value : '', title, description });
  };

  return (
    <div className="flex min-h-screen bg-beige-50 font-more-sugar">
      <Sidebar role="user" /> {/* Remplacez "user" par le rôle approprié */}
      <div className="flex flex-col w-full p-8">
        <h1 className="text-3xl text-brown-700 font-more-sugar mb-6">Publier</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          <div className="flex mb-6">
            <div>
              {selectedImage ? (
                <img src={selectedImage} alt="Prévisualisation" className="w-64 h-64 object-cover rounded-lg mb-4" />
              ) : (
                <div className="w-64 h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-700">Charger une photo</span>
                </div>
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
            <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="category">
              Choisir une catégorie :
            </label>
            <select id="category" value={category} onChange={handleCategoryChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300">
              <option value="">Sélectionner</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="city">
              Choisir une ville :
            </label>
            <CitySelect onChange={handleCityChange} value={city} />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishPage;
