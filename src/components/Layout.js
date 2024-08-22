import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-4"> {/* Ajoute une marge pour le contenu à droite de la sidebar */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
