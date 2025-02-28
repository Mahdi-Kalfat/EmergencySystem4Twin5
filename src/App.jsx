import { useState } from 'react'
import './App.css'
import SignIn from './pages/SignIn'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import SessionHandler from './components/SessionHandler'
import ResetPass from './pages/resetPass'
function App() {
  const [count, setCount] = useState(0)

  return (
  <div>
     <SessionHandler />
    <Routes>
          {/* Public Route */}
          <Route path="/" element={<SignIn />} />
          <Route path="/resetPass/:token" element={<ResetPass />} />

          {/* Protected Route */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
  </div>
  )
}




export default App