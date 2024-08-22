import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { getToken } from '../auth';

const ModeratorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentModerations, setRecentModerations] = useState([]);
  const [error, setError] = useState(null);
  const moderatorId = localStorage.getItem('author_id'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModeratorStats = async () => {
      try {
        const token = getToken(); // Récupération du token JWT

        if (!token) {
          setError("Utilisateur non authentifié.");
          return;
        }

        // Récupérer les statistiques
        const metricsResponse = await axios.get('http://127.0.0.1:8000/moderate/metrics', {
          headers: {
            'Authorization': `Bearer ${token}` // Ajout du token dans l'en-tête
          }
        });
        setStats(metricsResponse.data);

        // Récupérer les modérations récentes
        const moderationsResponse = await axios.get('http://127.0.0.1:8000/moderate/moderated', {
          headers: {
            'Authorization': `Bearer ${token}` // Ajout du token dans l'en-tête
          }
        });
        setRecentModerations(moderationsResponse.data);
      } catch (err) {
        setError("Erreur lors de la récupération des statistiques.");
        console.error(err);
      }
    };

    fetchModeratorStats();
  }, []);

  const handleModerateClick = () => {
    navigate('/moderate-post');
  };

  const defaultStats = {
    total: "n/a",
    refusee: "n/a",
    acceptee: "n/a",
  };

  const displayStats = stats || defaultStats;

  return (
<div className="flex min-h-screen bg-beige-50 font-more-sugar">
      <div className="fixed top-0 left-0 w-64 h-screen bg-beige-50">
        <Sidebar role="user" />
      </div>
      <div className="flex flex-col items-start w-full  p-2">
        <h1 className="text-3xl text-brown-700 font-more-sugar mb-6">Espace modérateur</h1>
        <div className="flex justify-between">
          <div className="w-1/2">
            <h2 className="text-xl text-brown-700 font-more-sugar mb-4">Dernières modérations :</h2>
            <div className="border-2 border-brown-700 bg-beige-200 p-4 rounded-lg mb-4">
              {recentModerations.length > 0 ? (
                recentModerations.map((mod, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-brown-700">Date : {new Date(mod.date).toLocaleDateString()}</p>
                    <p className="text-brown-700">Statut : {mod.status === 'accepted' ? 'Accepté' : 'Refusé'}</p>
                  </div>
                ))
              ) : (
                <p className="text-brown-700">Aucune modération récente disponible.</p>
              )}
            </div>
          </div>
          <div className="w-1/3">
            <button
              className="bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={handleModerateClick}
            >
              Cliquez ici pour modérer
            </button>
            <div className="text-gray-700 mb-4">Vous Etes le {stats?.rank || "n/a"} ème meilleur modérateur !</div>
            <div className="bg-brown-700 p-4 rounded-lg">
              <p className="text-white font-bold">Mes données :</p>
              <p className="text-white">Nombre d'éléments modérés : {displayStats.total}</p>
              <p className="text-white">Nombre d'éléments refusés : {displayStats.refusee}</p>
              <p className="text-white">Nombre d'éléments acceptés : {displayStats.acceptee}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;