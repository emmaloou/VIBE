import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from 'react-icons/fa'; // Importer les icônes de cœur

const PostCard = ({ title, content, img_URL, author, created_at, category, nb_like, nb_save, comments, onProfileClick }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className.includes("modal-overlay")) {
      closeModal();
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked); // Toggle l'état du like
  };

  const toggleSave = () => {
    setIsSaved(!isSaved); // Toggle l'état du like
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
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
      <div className="flex items-center justify-between mb-2">
        <a
          href={`/profile/${author.name}`} // Rediriger vers le profil de l'auteur
          onClick={(e) => {
            e.preventDefault();
            if (onProfileClick) onProfileClick(author);
          }}
          className="text-blue-500 font-bold"
        >
          @{author.name}
        </a>
        <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {category || "Catégorie non spécifiée"}
        </span>
      </div>
      {img_URL && (
        <img 
          src={img_URL} 
          alt={title} 
          className="rounded-md w-full mb-4 cursor-pointer"
          onClick={openModal}
        />
      )}
      <div className="flex items-center justify-between mb-2">
        <button onClick={toggleLike} className="text-red-500">
          {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
        </button>
        <button onClick={toggleSave} className="text-yellow-500">
          {isSaved ? <FaStar size={24} /> : <FaRegStar size={24} />}
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-2">{title || "Titre non disponible"}</h2>
      <p className="text-gray-700 mb-2">
        {showFullContent ? content : `${content.slice(0, 50)}...`}
      </p>
      {content.length > 50 && (
        <button onClick={toggleContent} className="text-blue-500">
          {showFullContent ? "Voir moins" : "Voir plus"}
        </button>
      )}
      <div className="text-sm text-gray-500">
        <p>{nb_like + (isLiked ? 1 : 0)} likes et {nb_save + (isSaved ? 1 : 0)} enregistrements</p>
        <p>{formattedDate || "Date non spécifiée"}</p>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 modal-overlay"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-8 rounded-lg max-w-4xl w-full relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" 
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="flex">
              <img src={img_URL} alt={title} className="w-1/2 rounded-md" />
              <div className="w-1/2 pl-6 flex flex-col">
                <a
                  href={`/profile/${author.name}`} // Rediriger vers le profil de l'auteur
                  onClick={(e) => {
                    e.preventDefault();
                    if (onProfileClick) onProfileClick(author);
                  }}
                  className="text-blue-500 font-bold"
                >
                  @{author.name}
                </a>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold">{title}</h2>
                  <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {category || "Catégorie non spécifiée"}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <button onClick={toggleLike} className="text-red-500">
                    {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                  </button>
                  <button onClick={toggleSave} className="text-yellow-500">
                    {isSaved ? <FaStar size={24} /> : <FaRegStar size={24} />}
                  </button>
                </div>
                <p className="text-gray-700 mb-4 flex-grow">{content}</p>
                <div className="text-sm text-gray-500">
                  <p>{nb_like + (isLiked ? 1 : 0)} likes et {nb_save + (isSaved ? 1 : 0)} enregistrements</p>
                  <p>{formattedDate || "Date non spécifiée"}</p>
                </div>
                <div className="mt-6 flex-grow overflow-y-auto max-h-32 pr-2">
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
                <div className="mt-4">
                  <form onSubmit={handleCommentSubmit} className="flex items-center">
                    <input
                      value={newComment}
                      onChange={handleCommentChange}
                      placeholder="Ajouter un commentaire..."
                      className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                      rows="1"
                    ></input>
                    <button
                      type="submit"
                      className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                    >
                      Commenter
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
