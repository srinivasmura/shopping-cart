import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems]       = useState([])
  const [popupOpen, setPopupOpen]       = useState(false)
  const [toastMsg,  setToastMsg]        = useState(null)

  const showToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 2500)
  }

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setPopupOpen(true)
    showToast(`"${product.title.slice(0, 28)}…" added to cart 🛒`)
  }

  const removeFromCart = (id) =>
    setCartItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id, delta) =>
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    )

  const clearCart = () => setCartItems([])

  const totalCount = cartItems.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cartItems.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQty, clearCart,
      totalCount, totalPrice,
      popupOpen, setPopupOpen,
      toastMsg,
    }}>
      {children}
    </CartContext.Provider>
  )
}
