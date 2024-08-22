// src/components/Terms.js
import React from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

/**
 * Le composant Terms est conçu pour afficher les Conditions Générales d'Utilisation (CGU)
 * de l'application VIBE. Il inclut une navigation fixe pour faciliter l'accès aux différentes
 * sections des CGU, et permet à l'utilisateur de revenir à la page d'inscription en un clic.
 */
const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Barre latérale fixe pour la navigation entre les sections */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-beige-50 p-8">
        {/* Bouton pour revenir à la page d'inscription */}
        <button
          onClick={() => navigate('/signup')}
          className="bg-brown-700 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded mb-6"
        >
          Retour à l'inscription
        </button>
        {/* Menu de navigation vertical pour les CGU */}
        <nav className="sticky top-0">
          <ul className="list-disc list-inside">
            <li>
              <ScrollLink to="preamble" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">
                Préambule
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="definitions" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">
                Définitions
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="access-inscription" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">
                Accès et Inscription
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="use-site" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">
                Utilisation du Site
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="responsibility" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">
                Responsabilité
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="moderation" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">
                Modération
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="personal-data" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">
                Données Personnelles
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="intellectual-property" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">
                Propriété Intellectuelle
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="modification-cgu" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">
                Modification des CGU
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="applicable-law" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">
                Droit Applicable et Juridiction Compétente
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="contact" smooth={true} duration={500} className="text-brown-500 hover:text-brown-800 cursor-pointer">
                Contact
              </ScrollLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Contenu principal des CGU */}
      <div className="w-2/3 bg-white px-8 pt-6 pb-8">
        <Element name="preamble">
          <h2 className="text-2xl mb-4 text-left text-brown-700">1. Préambule</h2>
          <p className="text-brown-700 text-left mb-4">
            Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation du réseau social de voyages
            (ci-après "le Site"). En accédant et en utilisant le Site, vous acceptez sans réserve les présentes CGU.
          </p>
        </Element>
        <Element name="definitions">
          <h2 className="text-2xl mb-4 text-left text-brown-700">2. Définitions</h2>
          <p className="text-brown-700 text-left mb-4">
            <strong>Utilisateur :</strong> Toute personne physique ou morale qui utilise le Site.<br />
            <strong>Contenu :</strong> Ensemble des informations, textes, images, vidéos, et autres données publiées par les Utilisateurs sur le Site.<br />
            <strong>Compte :</strong> Espace personnel créé par l'Utilisateur pour accéder aux services du Site.
          </p>
        </Element>
        <Element name="access-inscription">
          <h2 className="text-2xl mb-4 text-left text-brown-700">3. Accès et Inscription</h2>
          <p className="text-brown-700 text-left mb-4">
            3.1. L'accès au Site est gratuit et ouvert à toute personne disposant d'un accès à internet.<br />
            3.2. L'inscription sur le Site est obligatoire pour publier du Contenu, interagir avec d'autres Utilisateurs et accéder à certaines fonctionnalités.
            L'Utilisateur s'engage à fournir des informations exactes et à jour lors de l'inscription.
          </p>
          <p className="text-brown-700 text-left mb-4">
            3.3. Lors de l'inscription, l'Utilisateur devra accepter les présentes CGU en cochant une case dédiée. Cette étape est indispensable pour valider la création du
            compte. L'Utilisateur recevra ensuite un email de confirmation pour activer son compte. Ce processus assure la validité des informations fournies et prévient
            les inscriptions frauduleuses.
          </p>
          <p className="text-brown-700 text-left mb-4">
            3.4. Il est recommandé de choisir un mot de passe sécurisé et de le conserver confidentiel. En cas de perte ou de vol de ce dernier, l'Utilisateur devra
            immédiatement en informer le Site pour éviter tout accès non autorisé à son Compte.
          </p>
        </Element>
        <Element name="use-site">
          <h2 className="text-2xl mb-4 text-left text-brown-700">4. Utilisation du Site</h2>
          <p className="text-brown-700 text-left mb-4">
            4.1. L'Utilisateur s'engage à utiliser le Site conformément aux lois et règlements en vigueur, ainsi qu'aux présentes CGU.<br />
            4.2. Il est strictement interdit de publier tout Contenu illicite, diffamatoire, obscène, offensant, violent ou incitant à la haine.<br />
            4.3. L'Utilisateur s'engage à respecter les droits de propriété intellectuelle des tiers.
          </p>
          <p className="text-brown-700 text-left mb-4">
            4.4. Toute utilisation abusive du Site, y compris mais sans s'y limiter, les tentatives de piratage, les comportements malveillants ou les actions
            visant à perturber le bon fonctionnement de la plateforme, pourra entraîner des sanctions allant jusqu'à la suppression définitive du Compte de l'Utilisateur,
            sans préjudice des poursuites judiciaires éventuelles.
          </p>
          <p className="text-brown-700 text-left mb-4">
            4.5. Le Site se réserve le droit de restreindre ou de suspendre l'accès de tout Utilisateur qui ne respecterait pas ces engagements, afin de garantir une
            expérience sécurisée et agréable pour l'ensemble des membres de la communauté.
          </p>
        </Element>
        <Element name="responsibility">
          <h2 className="text-2xl mb-4 text-left text-brown-700">5. Responsabilité</h2>
          <p className="text-brown-700 text-left mb-4">
            5.1. Le Site décline toute responsabilité quant à la véracité et l'exactitude des Contenus publiés par les Utilisateurs.<br />
            5.2. Le Site ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'incapacité à utiliser le Site.
          </p>
          <p className="text-brown-700 text-left mb-4">
            5.3. En cas de maintenance, de pannes, ou de tout autre événement rendant le Site temporairement inaccessible, aucune compensation ne pourra être
            réclamée par l'Utilisateur. Le Site s'efforcera toutefois de rétablir l'accès dans les meilleurs délais.
          </p>
        </Element>
        <Element name="moderation">
          <h2 className="text-2xl mb-4 text-left text-brown-700">6. Modération</h2>
          <p className="text-brown-700 text-left mb-4">
            6.1. Le Site se réserve le droit de modérer, modifier ou supprimer tout Contenu qui ne respecterait pas les présentes CGU sans préavis.<br />
            6.2. En cas de non-respect des CGU, le Site se réserve le droit de suspendre ou de supprimer le Compte de l'Utilisateur fautif.
          </p>
          <p className="text-brown-700 text-left mb-4">
            6.3. Les modérateurs du Site veillent à l'application stricte de ces règles pour maintenir un environnement respectueux et constructif. Ils peuvent
            intervenir à tout moment pour modérer les échanges, prévenir les abus, et garantir que chaque Utilisateur puisse contribuer de manière positive à la
            communauté.
          </p>
        </Element>
        <Element name="personal-data">
          <h2 className="text-2xl mb-4 text-left text-brown-700">7. Données Personnelles</h2>
          <p className="text-brown-700 text-left mb-4">
            7.1. Les données personnelles des Utilisateurs sont collectées et traitées conformément à la politique de confidentialité du Site.<br />
            7.2. L'Utilisateur dispose d'un droit d'accès, de rectification, et de suppression de ses données personnelles.
          </p>
          <p className="text-brown-700 text-left mb-4">
            7.3. Le Site utilise des mesures de sécurité avancées pour protéger les données personnelles des Utilisateurs. Cela inclut le chiffrement des données
            sensibles, des systèmes de contrôle d'accès stricts, et une surveillance continue pour prévenir les violations de données.
          </p>
        </Element>
        <Element name="intellectual-property">
          <h2 className="text-2xl mb-4 text-left text-brown-700">8. Propriété Intellectuelle</h2>
          <p className="text-brown-700 text-left mb-4">
            8.1. Le Site et ses éléments (marques, logos, graphismes, textes, etc.) sont protégés par le droit de la propriété intellectuelle.<br />
            8.2. Toute reproduction, représentation, modification, publication, transmission ou dénaturation du Site et de ses éléments est interdite sans l'autorisation
            écrite préalable du Site.
          </p>
          <p className="text-brown-700 text-left mb-4">
            8.3. Toute utilisation non autorisée des éléments du Site pourra faire l'objet de poursuites judiciaires pour violation des droits de propriété intellectuelle.
            Les Utilisateurs sont donc invités à respecter scrupuleusement ces dispositions pour éviter tout litige.
          </p>
        </Element>
        <Element name="modification-cgu">
          <h2 className="text-2xl mb-4 text-left text-brown-700">9. Modification des CGU</h2>
          <p className="text-brown-700 text-left mb-4">
            Le Site se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prendront effet dès leur publication sur le Site.
          </p>
          <p className="text-brown-700 text-left mb-4">
            Les Utilisateurs seront informés des modifications via une notification sur le Site ou par email. Il leur est conseillé de consulter régulièrement les CGU
            pour rester informés des éventuels changements. En continuant à utiliser le Site après ces modifications, l'Utilisateur accepte les nouvelles conditions.
          </p>
        </Element>
        <Element name="applicable-law">
          <h2 className="text-2xl mb-4 text-left text-brown-700">10. Droit Applicable et Juridiction Compétente</h2>
          <p className="text-brown-700 text-left mb-4">
            Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
          </p>
          <p className="text-brown-700 text-left mb-4">
            Toutefois, avant toute procédure judiciaire, les parties s'engagent à tenter de résoudre amiablement le différend. Cette démarche privilégie le dialogue
            et peut aboutir à une solution plus rapide et moins coûteuse pour les deux parties.
          </p>
        </Element>
        <Element name="contact">
          <h2 className="text-2xl mb-4 text-left text-brown-700">11. Contact</h2>
          <p className="text-brown-700 text-left mb-4">
            Pour toute question relative aux présentes CGU, vous pouvez nous contacter à l'adresse suivante : emmalou.villaret@edu.ece.fr
          </p>
          <p className="text-brown-700 text-left mb-4">
            Nous nous engageons à répondre dans les plus brefs délais pour vous apporter toute l'assistance nécessaire concernant l'utilisation du Site ou toute autre
            demande relative à votre compte.
          </p>
        </Element>
      </div>
    </div>
  );
};

export default Terms;
