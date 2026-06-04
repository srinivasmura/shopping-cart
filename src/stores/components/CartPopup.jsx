import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'

function CartPopup() {
  const { cartItems, popupOpen, setPopupOpen, removeFromCart, updateQty, totalCount, totalPrice } = useCart()
  const overlayRef = useRef()
  const navigate   = useNavigate()

  /* close on outside click */
  useEffect(() => {
    if (!popupOpen) return
    const handler = (e) => {
      if (overlayRef.current && e.target === overlayRef.current) setPopupOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [popupOpen, setPopupOpen])

  /* lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = popupOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [popupOpen])

  if (!popupOpen) return null

  const handleViewCart = () => {
    setPopupOpen(false)
    navigate('/cart')
  }

  return (
    <div
      ref={overlayRef} className="cart-popup"   >
      {/* Panel */}
      <div className='cart-bg'>
        {/* ── Header ── */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #F3F4F6',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#111827' }}>
              🛒 Your Cart
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#9CA3AF' }}>
              {totalCount} item{totalCount !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setPopupOpen(false)}
            style={{
              background: '#F3F4F6', border: 'none', borderRadius: '50%',
              width: 36, height: 36, fontSize: '1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#6B7280', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
            onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
          >✕</button>
        </div>

        {/* ── Items ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {cartItems.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              height: '100%', padding: 40, color: '#9CA3AF', textAlign: 'center',
            }}>
              <span style={{ fontSize: '3.5rem', marginBottom: 14 }}>🛍️</span>
              <p style={{ fontWeight: 700, color: '#374151', marginBottom: 6 }}>Your cart is empty</p>
              <p style={{ fontSize: '0.8rem' }}>Browse our products and add something you like!</p>
              <button
                onClick={() => setPopupOpen(false)}
                style={{
                  marginTop: 20, padding: '10px 24px',
                  background: '#3B3562', color: '#fff',
                  border: 'none', borderRadius: 50, fontWeight: 700,
                  fontSize: '0.82rem', cursor: 'pointer',
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex', gap: 14, padding: '14px 24px',
                  borderBottom: '1px solid #F9FAFB',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Image */}
                <div style={{
                  width: 64, height: 64, flexShrink: 0,
                  background: '#F9FAFB', borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 6, border: '1px solid #F3F4F6',
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    margin: '0 0 4px', fontSize: '0.78rem', fontWeight: 600,
                    color: '#111827', lineHeight: 1.4,
                    overflow: 'hidden', textOverflow: 'ellipsis',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  }}>{item.title}</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: '#3B3562' }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#D1D5DB', fontSize: '0.85rem', padding: 0, lineHeight: 1,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                    onMouseLeave={e => e.currentTarget.style.color = '#D1D5DB'}
                  >✕</button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button onClick={() => updateQty(item.id, -1)} style={qtyBtnStyle}>−</button>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, minWidth: 16, textAlign: 'center', color: '#374151' }}>
                      {item.qty}
                    </span>
                    <button onClick={() => updateQty(item.id, 1)} style={qtyBtnStyle}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Footer ── */}
        {cartItems.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid #F3F4F6' }}>
            {/* Subtotal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>Subtotal</span>
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827' }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* View Cart Button */}
            <button
              onClick={handleViewCart}
              style={{
                width: '100%', padding: '13px',
                background: '#3B3562', color: '#fff',
                border: 'none', borderRadius: 12,
                fontFamily: "'Sora', sans-serif",
                fontSize: '0.9rem', fontWeight: 700,
                cursor: 'pointer', letterSpacing: '0.3px',
                transition: 'background 0.2s, transform 0.15s',
                marginBottom: 10,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#4c4680'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#3B3562'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              View Cart →
            </button>

            <button
              onClick={() => setPopupOpen(false)}
              style={{
                width: '100%', padding: '11px',
                background: 'transparent', color: '#6B7280',
                border: '1.5px solid #E5E7EB', borderRadius: 12,
                fontFamily: "'Sora', sans-serif",
                fontSize: '0.82rem', fontWeight: 600,
                cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#3B3562'; e.currentTarget.style.color = '#3B3562' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#6B7280' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}

const qtyBtnStyle = {
  width: 26, height: 26,
  background: '#F3F4F6', border: 'none', borderRadius: 6,
  fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#374151', transition: 'background 0.15s',
}

export default CartPopup
