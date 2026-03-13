import Page from './app/index.jsx'
import Register from './app/auth/register.jsx'
import Login from './app/auth/login.jsx'
import Dashbord from "./app/dashbord/index.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Page />,
    },
    {
      path: "/auth/login",
      element: <Login />
    },
    {
      path: "/auth/register",
      element: <Register />
    },
    {
      path: "/dashbord",
      element: <Dashbord />
    }
  ])

  // return (
  //   <Routes>
  //     <Route path="/" element={<Page />} />
  //     <Route path="/register"  element={<Register />} />
  //     <Route path="/login"     element={<Login />} />
  //   </Routes>

  return <RouterProvider router={router} />
  
}

export default App