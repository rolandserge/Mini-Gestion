import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/authStore";

export const ProtectedRoute = () => {

  const { isAuthenticated, isHydrated } = useAuth();

  // 1. Attendre que le store soit prêt
  if (!isHydrated) {
    return <div className="">Chargement...</div>;
  }

  // 2. Vérifier l'auth
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export const PublicRoute = () => {

  const { isAuthenticated, isHydrated } = useAuth();

  if (!isHydrated) return null; // Ou un spinner discret

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashbord" replace />;
};
