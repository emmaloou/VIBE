import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from 'react-icons/fa';

const PostCard = ({ title, content, img_URL, author, created_at, category, nb_like, nb_save, comments, onProfileClick }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // État pour gérer le like
  const [isSaved, setIsSaved] = useState(false);
  const [newComment, setNewComment] = useState(""); // État pour gérer le texte du commentaire

  if (!author || !author.surname || !author.name) {
    console.error("L'objet 'author' est indéfini ou certaines propriétés sont manquantes:", author);
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
        <p className="text-red-500">Données de l'auteur manquantes</p>
      </div>
    );
  }

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked); // Toggle l'état du like
  };

  const toggleSave = () => {
    setIsSaved(!isSaved); // Toggle l'état de l'enregistrement
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      console.log("Commentaire soumis:", newComment);
      setNewComment(""); // Réinitialiser le champ de commentaire après soumission
    }
  };

  // Formater la date pour l'affichage
  const formattedDate = new Date(created_at).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex w-full max-w-4xl">
      {img_URL && (
        <div>
          <img 
            src={img_URL} 
            alt={title} 
            className="rounded-md w-full h-full object-cover"
          />
        </div>
      )}

      {/* Infos et boutons à droite, prenant les deux tiers restants */}
      <div className="p-4 flex flex-col justify-between">
        {/* Informations sur l'auteur et la catégorie */}
        <div className="flex items-center justify-between mb-2">
          <a
            href={`/profile/${author.pseudo}`} // Rediriger vers le profil de l'auteur
            onClick={(e) => {
              e.preventDefault();
              if (onProfileClick) onProfileClick(author);
            }}
            className="text-blue-500 font-bold"
          >
            {author.name} {author.surname}
          </a>
          <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {category || "Catégorie non spécifiée"}
          </span>
        </div>

        {/* Titre et contenu du post */}
        <h2 className="text-2xl font-bold mb-2">{title || "Titre non disponible"}</h2>
        <p className="text-gray-700 mb-2">
          {showFullContent ? content : `${content.slice(0, 100)}...`}
        </p>
        {content.length > 100 && (
          <button onClick={toggleContent} className="text-blue-500">
            {showFullContent ? "Voir moins" : "Voir plus"}
          </button>
        )}

        {/* Infos supplémentaires: likes, saves, date */}
        <div className="text-sm text-gray-500">
          <p>{nb_like + (isLiked ? 1 : 0)} <button onClick={toggleLike} className="text-red-500">
            {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
          </button>
           {nb_save + (isSaved ? 1 : 0)} <button onClick={toggleSave} className="text-yellow-500">
            {isSaved ? <FaStar size={24} /> : <FaRegStar size={24} />}
          </button></p>
          <p>{formattedDate || "Date non spécifiée"}</p>
        </div>

        {/* Section des commentaires */}
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Commentaires :</h3>
          <ul className="overflow-y-auto max-h-32 pr-2">
            {comments && comments.length > 0 ? (
              comments.map((comment, index) => (
                <li key={index} className="border-b border-gray-200 py-2">
                  <p>{comment.text}</p>
                  <p className="text-xs text-gray-500">- {comment.author}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Aucun commentaire disponible.</p>
            )}
          </ul>
        </div>

        {/* Formulaire d'ajout de commentaire */}
        <form onSubmit={handleCommentSubmit} className="mt-4 flex items-center">
          <input
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Ajouter un commentaire..."
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Commenter
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
