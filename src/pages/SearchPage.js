// src/pages/SearchPage.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const SearchPage = () => {
  const [searchType, setSearchType] = useState('Personnes');

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const results = [
    { username: 'pseudo1' },
    { username: 'pseudo2' },
    { username: 'pseudo3' },
    { username: 'pseudo4' },
    { username: 'pseudo5' },
    { username: 'pseudo6' },
  ];

  return (
    <div className="flex min-h-screen bg-beige-50 font-more-sugar">
      <Sidebar role="user" /> {/* Remplacez "user" par le rôle approprié */}
      <div className="flex flex-col w-full p-8">
        <h1 className="text-3xl text-brown-700 font-more-sugar mb-6">Recherche</h1>
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex items-center mb-6">
            <input
              type="text"
              placeholder="Rechercher..."
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button className="p-2 bg-gray-300 border border-gray-300 rounded-r-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="flex mb-6">
            <button
              className={`p-2 rounded-full border ${searchType === 'Personnes' ? 'bg-brown-700 text-white' : 'border-gray-300'}`}
              onClick={() => handleSearchTypeChange('Personnes')}
            >
              Personnes
            </button>
            <button
              className={`p-2 rounded-full border ml-2 ${searchType === 'Lieu' ? 'bg-brown-700 text-white' : 'border-gray-300'}`}
              onClick={() => handleSearchTypeChange('Lieu')}
            >
              Lieu
            </button>
            <button
              className={`p-2 rounded-full border ml-2 ${searchType === 'Catégorie' ? 'bg-brown-700 text-white' : 'border-gray-300'}`}
              onClick={() => handleSearchTypeChange('Catégorie')}
            >
              Catégorie
            </button>
            <button
              className={`p-2 rounded-full border ml-2 ${searchType === 'Titre' ? 'bg-brown-700 text-white' : 'border-gray-300'}`}
              onClick={() => handleSearchTypeChange('Titre')}
            >
              Titre
            </button>
          </div>
          <div>
            {results.map((result, index) => (
              <div key={index} className="flex items-center mb-4">
                <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                <div className="ml-4 text-gray-700">@{result.username}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
