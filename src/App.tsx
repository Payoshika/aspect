import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NavLayout from './pages/navigation/NavLayout'
import BillingLayout from "./pages/billing/BillingLayout"
import Login from './pages/login/Login'
import ForgotPassword from './pages/login/ForgotPassword'
import ChangePassword from './pages/login/ChangePassword'
import NewJobLayout from './pages/new_job/NewJobLayout'

// Higher-order component to wrap pages with NavLayout
const withNavLayout = (Component: React.ComponentType) => {
  return (
    <NavLayout>
      <Component />
    </NavLayout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword email="test-email@gmail.com" passwordUpdatedAt="2025 Aug 11"/>} />
        <Route path="/new-job" element={withNavLayout(NewJobLayout)} />
        <Route path="/billing" element={withNavLayout(BillingLayout)} />
        <Route path="*" element={<Navigate to="/new-job" replace />} />
      </Routes>
    </Router>
  )
}

export default App
