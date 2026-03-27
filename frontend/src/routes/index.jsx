import { createBrowserRouter, Navigate } from "react-router-dom";
import Page from '../app/index.jsx';
import Register from '../app/auth/register.jsx';
import Login from '../app/auth/login.jsx';
import Dashbord from "../app/dashbord/index.jsx";
import { ProtectedRoute, PublicRoute } from "./protectedRoutes.jsx";
import DashbordLayout from "../layouts/index.jsx";
import Project from "../app/dashbord/project/index.jsx";
import DetailProject from "../app/dashbord/project/detailProject.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
  },
  {
     element: <PublicRoute />,
     children: [
          {
               path: "/auth/login",
               element: <Login />
          },
          {
               path: "/auth/register",
               element: <Register />
          }
     ]
  },
  // On enveloppe les routes privées dans un objet parent
  {
    element: <ProtectedRoute />, 
    children: [
      {
        element: <DashbordLayout />,
        children: [
          {
            path: "/dashbord",
            element: <Dashbord />
          },
          {
            path: "/dashbord/projets",
            element: <Project />
          },
          {
            path: "/dashbord/projets/:id",
            element: <DetailProject />
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);
