import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from './CartContext'
import CartPopup from './CartPopup'
import logo from '../../assets/e-mart-logo.png';

function Navbar() {
  const { totalCount, setPopupOpen } = useCart()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      {/* ── Desktop navbar ── */}
      <div className="flex-box navbar-section">

        {/* Mobile: hamburger (left) | brand (center) | spacer (right) */}
        <button
          className="nav-hamburger"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          {/* Hamburger icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <span className="nav-mobile-brand">
          <img src={logo} alt="E-Mart" style={{ height: '62px' }} />
        </span>
        <span className="nav-mobile-spacer" />

        {/* Desktop left links */}
        <div className="login-logo nav-desktop-logo">
          <img src={logo} alt="E-Mart" />
        </div>
        <div className="left-nav">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Desktop right links */}
        <div className="right-nav">
          <ul>
            <li><Link to="/contact">Sign In / Sign Up</Link></li>
            <li>
              <button
                className="nav-cart-btn"
                onClick={() => setPopupOpen(true)}
              >
                <span>Cart</span>
                {totalCount > 0 && (
                  <span className="nav-cart-badge">{totalCount}</span>
                )}
              </button>
            </li>
            <li><Link to="/login">Log Out</Link></li>
          </ul>
        </div>
      </div>

      {/* ── Mobile overlay ── */}
      <div
        className={`nav-overlay${drawerOpen ? " nav-overlay--open" : ""}`}
        onClick={closeDrawer}
      />

      {/* ── Mobile drawer (slides left → right) ── */}
      <nav className={`nav-drawer${drawerOpen ? " nav-drawer--open" : ""}`}>

        <div className="nav-drawer-header">
          <span className="nav-drawer-brand">E-Mart</span>
          <button
            className="nav-drawer-close"
            onClick={closeDrawer}
            aria-label="Close navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Main nav links */}
        <ul className="nav-drawer-links">
          <li><Link to="/home" onClick={closeDrawer}>🏠 Home</Link></li>
          <li><Link to="/about" onClick={closeDrawer}>ℹ️ About Us</Link></li>
          <li><Link to="/products" onClick={closeDrawer}>🛍️ Products</Link></li>
          <li><Link to="/contact" onClick={closeDrawer}>📬 Contact Us</Link></li>
          <li>
            <button onClick={() => { setPopupOpen(true); closeDrawer(); }}>
              🛒 Cart
              {totalCount > 0 && (
                <span className="nav-cart-badge">{totalCount}</span>
              )}
            </button>
          </li>
        </ul>

        {/* Bottom: logout */}
        <ul className="nav-drawer-bottom">
          <li><Link to="/login" onClick={closeDrawer}>🚪 Log Out</Link></li>
        </ul>

      </nav>

      {/* Cart popup */}
      <CartPopup />
    </>
  )
}

export default Navbar