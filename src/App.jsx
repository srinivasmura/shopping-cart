import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { CartProvider } from './stores/components/CartContext'
import './App.css'

import Navbar from './stores/components/Navbar'
import Home from './stores/pages/Home'
import AboutUs from './stores/pages/AboutUs'
import Products from './stores/components/Products'
import ContactUs from './stores/pages/ContactUs'
import Cart from './stores/pages/Cart'
import Footer from './stores/pages/Footer'
import Login from './stores/pages/Login'
import SignUp from './stores/pages/SignUp'
import ForgotPassword from './stores/pages/ForgotPassword'
import ResetPassword from './stores/pages/ResetPassword'

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

/* Hides Navbar and Footer on all auth-related pages */
const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password"
  return (
    <div className="main-container">
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App