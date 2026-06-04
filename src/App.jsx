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

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

/* Hides Navbar and Footer on the login page */
const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const isLoginPage = pathname === "/login" || pathname === "/"
  return (
    <div className="main-container">
      {!isLoginPage && <Navbar />}
      {children}
      {!isLoginPage && <Footer />}
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