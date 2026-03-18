import axios from "axios";
import { useAuth } from "../store/authStore";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Intercepteur pour ajouter le token de Zustand à chaque appel
// Injection automatique du token JWT
api.interceptors.request.use(
  (config) => {
    const token = useAuth.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si erreur 401 et que ce n'est pas déjà une tentative de refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh")
    ) {
      // Marque la requête pour éviter une boucle infinie
      originalRequest._retry = true;

      try {
        // 1. Appeler la route de refresh de Laravel JWT
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/refresh`,
          {},
          {
            headers: { Authorization: `Bearer ${useAuth.getState().token}` },
          },
        );

        const newToken = res.data.access_token;

        // 2. Mettre à jour le store Zustand
        useAuth.getState().setToken(newToken);

        // 3. Mettre à jour le header de la requête initiale et la relancer
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // Si le refresh échoue aussi (ex: refresh token expiré), on déconnecte
        useAuth.getState().logout();

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
