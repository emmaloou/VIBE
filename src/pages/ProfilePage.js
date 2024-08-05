// src/pages/ProfilePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ProfilePage = () => {
  const { username } = useParams();
  
  const userRole = 'admin';

  // remplacer avec les données de la bbd
  const user = {
    name: 'Nom Prénom',
    username: 'pseudo',
    bio: 'Biographie de passionné du voyage et des aventures',
    nextDestination: 'Prochaine destination de rêve',
    posts: [],
  };
  
  return (
    <div className="flex min-h-screen bg-beige-50 font-more-sugar">
      <Sidebar role={userRole} />      
      <div className="flex flex-col items-center w-full p-6">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-2xl">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-gray-300 h-20 w-20"></div>
            <div className="ml-4">
              <div className="font-bold text-gray-800 text-xl">{user.name}</div>
              <div className="text-gray-600">@{user.username}</div>
              <div className="text-gray-800 mt-2">{user.bio}</div>
              <div className="text-gray-600">{user.nextDestination}</div>
            </div>
          </div>
          <div className="text-gray-800 mt-4">{user.posts.length} publications</div>
        </div>
        {/* publications */}
        <div className="grid grid-cols-2 gap-4">
          {user.posts.map((post, index) => (
            <div key={index} className="bg-gray-300 h-64 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
