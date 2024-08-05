// src/pages/HomePage.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import PostCard from '../components/PostCard';

const HomePage = () => {
  const userRole = 'admin'; // Changez en 'user', 'modo' ou 'admin' pour tester différents rôles
  // post de test:
  const posts = [
    {
      user: { name: 'Valérie VERROY', username: 'valo' },
      title: 'Unimami',
      location: 'La Grande-Motte, France',
      description: 'Super resto japonais, je recommande!!!',
      date:'02/07/2024',
      category: 'Restaurant',
      postId: 1,
    },
  ];

  return (
    <div className="flex min-h-screen bg-beige-50 font-more-sugar">
      <Sidebar role={userRole} />
      <div className="flex flex-col items-center w-full p-6">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
