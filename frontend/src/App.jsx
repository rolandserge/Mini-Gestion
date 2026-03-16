import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.jsx";
import { useEffect } from "react";
import { useAuth } from "./store/authStore.js";

function App() {
  useEffect(() => {
    const { token, checkAuth } = useAuth.getState();
    if (token) {
      // On vérifie si le token est toujours valide côté serveur
      checkAuth();
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
