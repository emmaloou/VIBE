// src/components/Terms.js
import React from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-beige-50 p-8">
      <div className="w-1/3 pr-8">
        <button
          onClick={() => navigate('/signup')}
          className="bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded mb-6"
        >
          Retour à l'inscription
        </button>
        <nav className="sticky top-0">
          <ul className="list-disc list-inside">
            <li><ScrollLink to="preamble" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">Préambule</ScrollLink></li>
            <li><ScrollLink to="definitions" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">Définitions</ScrollLink></li>
            <li><ScrollLink to="access-inscription" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">Accès et Inscription</ScrollLink></li>
            <li><ScrollLink to="use-site" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">Utilisation du Site</ScrollLink></li>
            <li><ScrollLink to="responsibility" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">Responsabilité</ScrollLink></li>
            <li><ScrollLink to="moderation" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">Modération</ScrollLink></li>
            <li><ScrollLink to="personal-data" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">Données Personnelles</ScrollLink></li>
            <li><ScrollLink to="intellectual-property" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">Propriété Intellectuelle</ScrollLink></li>
            <li><ScrollLink to="modification-cgu" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">Modification des CGU</ScrollLink></li>
            <li><ScrollLink to="applicable-law" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">Droit Applicable et Juridiction Compétente</ScrollLink></li>
            <li><ScrollLink to="contact" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">Contact</ScrollLink></li>
          </ul>
        </nav>
      </div>
      <div className="w-2/3 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <Element name="preamble">
          <h2 className="text-2xl mb-4 text-left text-brown-700">1. Préambule</h2>
          <p className="text-brown-700 text-left mb-4">
            Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation du réseau social de voyages (ci-après "le Site"). En accédant et en utilisant le Site, vous acceptez sans réserve les présentes CGU.
          </p>
        </Element>
        <Element name="definitions">
          <h2 className="text-2xl mb-4 text-left text-brown-700">2. Définitions</h2>
          <p className="text-brown-700 text-left mb-4">
            <strong>Utilisateur :</strong> Toute personne physique ou morale qui utilise le Site.<br/>
            <strong>Contenu :</strong> Ensemble des informations, textes, images, vidéos, et autres données publiées par les Utilisateurs sur le Site.<br/>
            <strong>Compte :</strong> Espace personnel créé par l'Utilisateur pour accéder aux services du Site.
          </p>
        </Element>
        <Element name="access-inscription">
          <h2 className="text-2xl mb-4 text-left text-brown-700">3. Accès et Inscription</h2>
          <p className="text-brown-700 text-left mb-4">
            3.1. L'accès au Site est gratuit et ouvert à toute personne disposant d'un accès à internet.<br/>
            3.2. L'inscription sur le Site est obligatoire pour publier du Contenu, interagir avec d'autres Utilisateurs et accéder à certaines fonctionnalités. L'Utilisateur s'engage à fournir des informations exactes et à jour lors de l'inscription.
          </p>
        </Element>
        <Element name="use-site">
          <h2 className="text-2xl mb-4 text-left text-brown-700">4. Utilisation du Site</h2>
          <p className="text-brown-700 text-left mb-4">
            4.1. L'Utilisateur s'engage à utiliser le Site conformément aux lois et règlements en vigueur, ainsi qu'aux présentes CGU.<br/>
            4.2. Il est strictement interdit de publier tout Contenu illicite, diffamatoire, obscène, offensant, violent ou incitant à la haine.<br/>
            4.3. L'Utilisateur s'engage à respecter les droits de propriété intellectuelle des tiers.
          </p>
        </Element>
        <Element name="responsibility">
          <h2 className="text-2xl mb-4 text-left text-brown-700">5. Responsabilité</h2>
          <p className="text-brown-700 text-left mb-4">
            5.1. Le Site décline toute responsabilité quant à la véracité et l'exactitude des Contenus publiés par les Utilisateurs.<br/>
            5.2. Le Site ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'incapacité à utiliser le Site.
          </p>
        </Element>
        <Element name="moderation">
          <h2 className="text-2xl mb-4 text-left text-brown-700">6. Modération</h2>
          <p className="text-brown-700 text-left mb-4">
            6.1. Le Site se réserve le droit de modérer, modifier ou supprimer tout Contenu qui ne respecterait pas les présentes CGU sans préavis.<br/>
            6.2. En cas de non-respect des CGU, le Site se réserve le droit de suspendre ou de supprimer le Compte de l'Utilisateur fautif.
          </p>
        </Element>
        <Element name="personal-data">
          <h2 className="text-2xl mb-4 text-left text-brown-700">7. Données Personnelles</h2>
          <p className="text-brown-700 text-left mb-4">
            7.1. Les données personnelles des Utilisateurs sont collectées et traitées conformément à la politique de confidentialité du Site.<br/>
            7.2. L'Utilisateur dispose d'un droit d'accès, de rectification, et de suppression de ses données personnelles.
          </p>
        </Element>
        <Element name="intellectual-property">
          <h2 className="text-2xl mb-4 text-left text-brown-700">8. Propriété Intellectuelle</h2>
          <p className="text-brown-700 text-left mb-4">
            8.1. Le Site et ses éléments (marques, logos, graphismes, textes, etc.) sont protégés par le droit de la propriété intellectuelle.<br/>
            8.2. Toute reproduction, représentation, modification, publication, transmission ou dénaturation du Site et de ses éléments est interdite sans l'autorisation écrite préalable du Site.
          </p>
        </Element>
        <Element name="modification-cgu">
          <h2 className="text-2xl mb-4 text-left text-brown-700">9. Modification des CGU</h2>
          <p className="text-brown-700 text-left mb-4">
            Le Site se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prendront effet dès leur publication sur le Site.
          </p>
        </Element>
        <Element name="applicable-law">
          <h2 className="text-2xl mb-4 text-left text-brown-700">10. Droit Applicable et Juridiction Compétente</h2>
          <p className="text-brown-700 text-left mb-4">
            Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </Element>
        <Element name="contact">
          <h2 className="text-2xl mb-4 text-left text-brown-700">11. Contact</h2>
          <p className="text-brown-700 text-left mb-4">
            Pour toute question relative aux présentes CGU, vous pouvez nous contacter à l'adresse suivante : emmalou.villaret@edu.ece.fr
          </p>
        </Element>
      </div>
    </div>
  );
};

export default Terms;
