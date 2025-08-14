import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NavLayout from './pages/navigation/NavLayout'
import Login from './pages/login/Login'
import ForgotPassword from './pages/login/ForgotPassword'
import ChangePassword from './pages/login/ChangePassword'
import NewJobLayout from './pages/new_job/NewJobLayout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword email="test-email@gmail.com" passwordUpdatedAt="2025 Aug 11"/>} />
        <Route path="/new-job" element={
          <NavLayout>
            <NewJobLayout/>
          </NavLayout>
        } />
        <Route path="*" element={<Navigate to="/new-job" replace />} />
      </Routes>
    </Router>
  )
}

export default App
