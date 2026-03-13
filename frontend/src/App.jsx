import { Routes, Route } from 'react-router-dom'
import Page from './app/Page.jsx'
import Register from './app/Register.jsx'
import Login from './app/Login.jsx'

function App() {
  return (
    <Routes>
      <Route path="/"          element={<Page />} />
      <Route path="/register"  element={<Register />} />
      <Route path="/login"     element={<Login />} />
    </Routes>
  )
}

export default App