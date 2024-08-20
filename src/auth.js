import { jwtDecode } from 'jwt-decode';

// Fonction pour récupérer le token JWT du localStorage
export const getToken = () => localStorage.getItem('token');

// Fonction pour décoder le JWT et récupérer les informations utilisateur
export const getUserInfoFromToken = () => {
    const token = getToken();
    if (!token) {
        return null;
    }
    
    try {
        const decoded = jwtDecode(token);
        return {
            userId: decoded.user_id,
            userPseudo: decoded.user_pseudo,
            userRole: decoded.user_role,
        };
    } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        return null;
    }
};

// Fonction pour vérifier si le token est expiré
export const isTokenExpired = () => {
    const token = getToken();
    if (!token) {
        return true;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convertir la date actuelle en secondes
        return decoded.exp < currentTime;
    } catch (error) {
        console.error("Erreur lors de la vérification de l'expiration du token:", error);
        return true;
    }
};

// Fonction pour effacer le token du localStorage (lors de la déconnexion)
export const clearUser = () => {
    localStorage.removeItem('token');
};

// Fonction pour vérifier l'authentification et rediriger si nécessaire
export const checkAuth = () => {
    if (isTokenExpired()) {
        clearUser(); // Supprimez le token s'il est expiré
        window.location.href = '/login'; // Rediriger vers la page de connexion
    }
};
