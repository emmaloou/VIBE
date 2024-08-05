import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const navItems = {
  user: [
    { label: 'Accueil', icon: 'home', path: '/' },
    { label: 'Recherche', icon: 'search', path: '/search' },
    { label: 'Publier', icon: 'add_circle', path: '/publish' },
    { label: 'Suivie', icon: 'favorite', path: '/follow' },
    { label: 'Profil', icon: 'person', path: `/profile/${localStorage.getItem('username')}` },
    { label: 'Réglages', icon: 'settings', path: '/settings' },
  ],
  modo: [
    { label: 'Accueil', icon: 'home', path: '/' },
    { label: 'Recherche', icon: 'search', path: '/search' },
    { label: 'Publier', icon: 'add_circle', path: '/publish' },
    { label: 'Suivie', icon: 'favorite', path: '/follow' },
    { label: 'Profil', icon: 'person', path: `/profile/${localStorage.getItem('username')}` },
    { label: 'Réglages', icon: 'settings', path: '/settings' },
    { label: 'Modération', icon: 'check_circle', path: '/moderation' },
  ],
  admin: [
    { label: 'Accueil', icon: 'home', path: '/' },
    { label: 'Recherche', icon: 'search', path: '/search' },
    { label: 'Publier', icon: 'add_circle', path: '/publish' },
    { label: 'Suivie', icon: 'favorite', path: '/follow' },
    { label: 'Profil', icon: 'person', path: `/profile/${localStorage.getItem('username')}` },
    { label: 'Réglages', icon: 'settings', path: '/settings' },
    { label: 'Modération', icon: 'check_circle', path: '/moderation' },
    { label: 'Administration', icon: 'build', path: '/admin' },
  ],
};

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="md:hidden flex justify-between items-center p-4 bg-beige-50">
        <img src={Logo} alt="Vibe logo" className="h-12" />
        <button onClick={toggleMenu} className="text-brown-700 focus:outline-none">
          <span className="material-icons">{isMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>
      <div className={`w-64 h-screen bg-beige-50 flex flex-col items-center p-4 md:static fixed top-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <img src={Logo} alt="Vibe logo" className="h-40 mb-8" />
        <nav className="flex flex-col w-full flex-grow">
          {navItems[role].map((item, index) => (
            <Link to={item.path} key={index} className="flex items-center mb-4 p-2 hover:bg-gray-200 rounded">
              <span className="material-icons mr-3 text-brown-700">{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className="flex items-center mb-4 p-2 hover:bg-gray-200 rounded bg-brown-700 text-white w-full justify-center">
          <span className="material-icons mr-3">logout</span>Se déconnecter
        </button>
      </div>
    </>
  );
};

export default Sidebar;
