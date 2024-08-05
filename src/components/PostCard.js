// src/components/PostCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ user, title, location, description, date, likes, category, postId }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-2xl">
      <div className="flex items-center mb-4">
        <div className="rounded-full bg-gray-300 h-10 w-10"></div>
        <div className="ml-4">
          <Link to={`/profile/${user.username}`} className="font-bold text-gray-800">{user.name}</Link>
          <Link to={`/profile/${user.username}`} className="text-gray-600">@{user.username}</Link>
        </div>
        <button className="ml-auto bg-transparent border border-gray-800 rounded-full py-1 px-3 text-gray-800">
          {category}
        </button>
      </div>
      <Link to={`/post/${postId}`} className="block bg-gray-300 h-64 rounded-lg mb-4"></Link>
      <div className="text-lg font-bold text-gray-800">{title}</div>
      <div className="text-gray-600 mb-4">{location}</div>
      <div className="text-gray-800 mb-4">{description}</div>
      <div className="text-gray-600 mb-4">{date}</div>
    </div>
  );
};

export default PostCard;
