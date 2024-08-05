// src/pages/SettingsPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const SettingsPage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [description, setDescription] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleSaveProfileImage = () => {
    console.log('Photo de profil enregistrée');
  };

  const handleSaveDescription = () => {
    console.log('Description enregistrée');
  };

  const handleSavePassword = () => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (newPassword !== confirmNewPassword) {
      setPasswordError('Les mots de passe ne correspondent pas.');
    } else if (!passwordPattern.test(newPassword)) {
      setPasswordError('Le mot de passe doit comporter au moins 8 caractères, avec des majuscules, minuscules, chiffres et caractères spéciaux.');
    } else {
      setPasswordError('');
      console.log('Mot de passe enregistré');
    }
  };

  const handleLogout = () => {
    console.log('Déconnexion');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-beige-50 font-more-sugar">
      <Sidebar role="user" />
      <div className="flex flex-col w-full p-8">
        <h1 className="text-3xl text-brown-700 mb-6">Réglages</h1>
        <div className="bg-white shadow-md rounded-lg p-8 mb-6">
          <div className="flex items-center mb-4">
            {profileImage ? (
              <img src={profileImage} alt="Prévisualisation" className="w-20 h-20 object-cover rounded-full" />
            ) : (
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-700">Photo</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="profileImageUpload" />
            <label htmlFor="profileImageUpload" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded cursor-pointer ml-4">
              Galerie Photos
            </label>
          </div>
          <div className="flex justify-end">
            <button onClick={handleSaveProfileImage} className="bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded">
              Enregistrer
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8 mb-6">
          <div className="mb-4">
            <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="description">
              Changer sa description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button onClick={handleSaveDescription} className="bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded">
              Enregistrer
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8 mb-6">
          <div className="mb-4">
            <label className="block text-brown-700 text-sm font-bold mb-2 text-left" htmlFor="currentPassword">
              Changer son mot de passe
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              placeholder="Mot de passe actuel"
              className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Nouveau mot de passe"
              className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              placeholder="Confirmation nouveau mot de passe"
              className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="flex justify-end">
            <button onClick={handleSavePassword} className="bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
