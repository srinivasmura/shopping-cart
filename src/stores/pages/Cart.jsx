import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../components/CartContext'

/* ─── Stars ──────────────────────────────────────────────────────────────── */
const Stars = ({ rate }) => {
  const full = Math.floor(rate)
  const half = rate - full >= 0.4
  return (
    <span className='stars'>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  )
}

/* ─── Field ──────────────────────────────────────────────────────────────── */
const Field = ({ label, value, onChange, placeholder, error, type = 'text', half }) => (
  <div className={half ? 'field-half' : 'field-full'}>
    <label className='field-label'>{label}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      className={`field-input${error ? ' field-input--error' : ''}`}
    />
    {error && <p className='field-error'>{error}</p>}
  </div>
)

/* ─── STEP 1 — Cart items ────────────────────────────────────────────────── */
function CartStep({ onProceed }) {
  const { cartItems, removeFromCart, updateQty, totalPrice, setPopupOpen } = useCart()
  const TAX      = totalPrice * 0.08
  const SHIPPING = totalPrice >= 50 ? 0 : 5.99
  const TOTAL    = totalPrice + TAX + SHIPPING

  if (cartItems.length === 0)
    return (
      <div className='cart-empty'>
        <span className='cart-empty-icon'>🛒</span>
        <h2 className='cart-empty-title'>Your cart is empty</h2>
        <p className='cart-empty-text'>Looks like you haven't added anything yet.</p>
        <Link to='/products' className='cart-empty-link'>Browse Products</Link>
      </div>
    )

  return (
    <div className='cart-layout'>

      {/* ── Item list ── */}
      <div>
        <h2 className='cart-items-heading'>Cart Items ({cartItems.length})</h2>
        <div className='cart-items-list'>
          {cartItems.map(item => (
            <div key={item.id} className='cart-item-card'>

              {/* Image */}
              <div className='cart-item-img-wrap'>
                <img src={item.image} alt={item.title} className='cart-item-img' />
              </div>

              {/* Details */}
              <div className='cart-item-details'>
                <span className='cart-item-category'>{item.category}</span>
                <p className='cart-item-title'>{item.title}</p>
                <div className='cart-item-rating-row'>
                  <Stars rate={item.rating?.rate ?? 0} />
                  <span className='cart-item-count'>({item.rating?.count})</span>
                </div>
              </div>

              {/* Right side */}
              <div className='cart-item-right'>
                <div className='cart-item-price-wrap'>
                  <p className='cart-item-price'>${(item.price * item.qty).toFixed(2)}</p>
                  <p className='cart-item-unit-price'>${item.price.toFixed(2)} each</p>
                </div>
                <div className='cart-qty-controls'>
                  <button onClick={() => updateQty(item.id, -1)} className='qty-btn'>−</button>
                  <span className='cart-qty-value'>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}  className='qty-btn'>+</button>
                  <button onClick={() => removeFromCart(item.id)} className='qty-btn qty-btn--delete'>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Order Summary ── */}
      <div className='order-summary'>
        <h3 className='order-summary-title'>Order Summary</h3>

        <div className='order-rows'>
          {[
            ['Subtotal',  `$${totalPrice.toFixed(2)}`],
            ['Shipping',  SHIPPING === 0 ? '🎉 Free' : `$${SHIPPING.toFixed(2)}`],
            ['Tax (8%)',  `$${TAX.toFixed(2)}`],
          ].map(([k, v]) => (
            <div key={k} className='order-row'>
              <span className='order-row-label'>{k}</span>
              <span className={`order-row-value${v.includes('Free') ? ' order-row-value--free' : ''}`}>{v}</span>
            </div>
          ))}
        </div>

        <div className='order-total'>
          <span className='order-total-label'>Total</span>
          <span className='order-total-value'>${TOTAL.toFixed(2)}</span>
        </div>

        {totalPrice < 50 && (
          <div className='free-shipping-notice'>
            Add <strong>${(50 - totalPrice).toFixed(2)}</strong> more for free shipping! 🚚
          </div>
        )}

        <button onClick={onProceed} className='proceed-btn'>
          Proceed to Checkout →
        </button>

        <div className='trust-badges'>
          {['🔒 Secure', '↩️ Easy Returns', '🚚 Fast Ship'].map(t => (
            <span key={t} className='trust-badge'>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── STEP 2 — Checkout form ─────────────────────────────────────────────── */
function CheckoutStep({ onSuccess, onBack }) {
  const { totalPrice } = useCart()
  const TAX   = totalPrice * 0.08
  const TOTAL = totalPrice + TAX

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zip: '', country: '',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  })
  const [errors, setErrors] = useState({})
  const [paying, setPaying] = useState(false)

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }))

  const fmtCard   = v => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const fmtExpiry = v => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d }

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim())  e.lastName  = 'Required'
    if (!form.email.includes('@')) e.email = 'Enter a valid email'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim())    e.city    = 'Required'
    if (!form.zip.trim())     e.zip     = 'Required'
    if (!form.cardName.trim()) e.cardName = 'Required'
    if (form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card'
    if (!form.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = 'Use MM/YY format'
    if (form.cvv.length < 3) e.cvv = 'Enter 3-4 digit CVV'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePay = () => {
    if (!validate()) return
    setPaying(true)
    setTimeout(() => { setPaying(false); onSuccess() }, 1800)
  }

  return (
    <div className='checkout-layout'>

      <div>
        <button onClick={onBack} className='back-btn'>← Back to Cart</button>

        {/* Shipping */}
        <Section title='📦 Shipping Information'>
          <div className='form-row'>
            <Field label='First Name' value={form.firstName} onChange={set('firstName')} placeholder='John' error={errors.firstName} half />
            <Field label='Last Name'  value={form.lastName}  onChange={set('lastName')}  placeholder='Doe'  error={errors.lastName}  half />
          </div>
          <div className='form-row'>
            <Field label='Email Address'    value={form.email} onChange={set('email')} placeholder='john@example.com' error={errors.email} type='email' half />
            <Field label='Phone (optional)' value={form.phone} onChange={set('phone')} placeholder='+1 555 000 0000' half />
          </div>
          <Field label='Street Address' value={form.address} onChange={set('address')} placeholder='123 Main St' error={errors.address} />
          <div className='form-row'>
            <Field label='City' value={form.city} onChange={set('city')} placeholder='New York' error={errors.city} half />
            <Field label='ZIP'  value={form.zip}  onChange={set('zip')}  placeholder='10001'    error={errors.zip}  half />
          </div>
          <Field label='Country' value={form.country} onChange={set('country')} placeholder='United States' />
        </Section>

        {/* Payment */}
        <Section title='💳 Payment Details'>
          <div className='payment-methods'>
            {['💳 Visa/MC', '🏦 PayPal', '🍎 Apple Pay'].map(m => (
              <div key={m} className='payment-method-item'>{m}</div>
            ))}
          </div>
          <Field label='Name on Card'  value={form.cardName}   onChange={set('cardName')}  placeholder='John Doe'            error={errors.cardName} />
          <Field label='Card Number'   value={form.cardNumber} onChange={v => set('cardNumber')(fmtCard(v))} placeholder='1234 5678 9012 3456' error={errors.cardNumber} />
          <div className='form-row'>
            <Field label='Expiry' value={form.expiry} onChange={v => set('expiry')(fmtExpiry(v))} placeholder='MM/YY' error={errors.expiry} half />
            <Field label='CVV'    value={form.cvv}    onChange={v => set('cvv')(v.replace(/\D/g, '').slice(0, 4))} placeholder='123' error={errors.cvv} half />
          </div>
          <div className='ssl-note'>
            <span className='ssl-note-text'>🔒 Your payment is secured with 256-bit SSL encryption</span>
          </div>
        </Section>
      </div>

      {/* Order Summary (sticky) */}
      <div className='checkout-summary'>
        <h3 className='checkout-summary-title'>Order Total</h3>

        <div className='summary-row'>
          <span className='summary-row-label'>Subtotal</span>
          <span className='summary-row-value'>${totalPrice.toFixed(2)}</span>
        </div>
        <div className='summary-row'>
          <span className='summary-row-label'>Tax (8%)</span>
          <span className='summary-row-value'>${TAX.toFixed(2)}</span>
        </div>
        <div className='summary-row'>
          <span className='summary-row-label'>Shipping</span>
          <span className='summary-row-value summary-row-value--free'>Free</span>
        </div>

        <div className='checkout-total'>
          <span className='checkout-total-label'>Total Due</span>
          <span className='checkout-total-value'>${TOTAL.toFixed(2)}</span>
        </div>

        <button onClick={handlePay} disabled={paying} className='pay-btn'>
          {paying ? (
            <><span className='pay-btn-spinner' />Processing…</>
          ) : (
            <>🔐 Pay ${TOTAL.toFixed(2)}</>
          )}
        </button>
      </div>
    </div>
  )
}

/* ─── STEP 3 — Success ───────────────────────────────────────────────────── */
function SuccessStep() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const TAX      = totalPrice * 0.08
  const TOTAL    = totalPrice + TAX
  const orderNum = '#' + Math.floor(100000 + Math.random() * 900000)

  return (
    <div className='success-wrapper'>
      <div className='success-icon'>✓</div>

      <h1 className='success-title'>Order Confirmed! 🎉</h1>
      <p className='success-subtitle'>Thank you for your purchase. A confirmation will be sent to your email.</p>
      <p className='success-order-num'>Order {orderNum} · Estimated delivery: 3–5 business days</p>

      {/* Mini receipt */}
      <div className='mini-receipt'>
        <p className='mini-receipt-heading'>Order Summary</p>
        {cartItems.map(item => (
          <div key={item.id} className='receipt-item'>
            <span className='receipt-item-name'>{item.title.slice(0, 36)}… ×{item.qty}</span>
            <span className='receipt-item-price'>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
        <div className='receipt-total'>
          <span>Total Paid</span>
          <span className='receipt-total-value'>${TOTAL.toFixed(2)}</span>
        </div>
      </div>

      <button onClick={() => { clearCart(); navigate('/') }} className='continue-btn'>
        Continue Shopping
      </button>

      <style>{`
        @keyframes successPop {
          0%   { transform: scale(0.4); opacity: 0; }
          60%  { transform: scale(1.1); }
          100% { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  )
}

/* ─── STEP INDICATOR ─────────────────────────────────────────────────────── */
function StepBar({ step }) {
  const steps = ['Cart', 'Checkout', 'Confirmation']
  return (
    <div className='step-bar'>
      {steps.map((s, i) => (
        <div key={s} className='step-item'>
          <div className='step-item-inner'>
            <div className={`step-circle${i < step ? ' step-circle--done' : i === step ? ' step-circle--active' : ''}`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`step-label${i <= step ? ' step-label--active' : ''}`}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`step-connector${i < step ? ' step-connector--done' : ''}`} />
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── SECTION wrapper ────────────────────────────────────────────────────── */
const Section = ({ title, children }) => (
  <div className='form-section'>
    <h3 className='form-section-title'>{title}</h3>
    <div className='form-section-content'>{children}</div>
  </div>
)

/* ─── ROOT Cart Page ─────────────────────────────────────────────────────── */
const Cart = () => {
  const [step, setStep] = useState(0)   // 0=cart  1=checkout  2=success

  return (
    <div className='cart-root'>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
      `}</style>

      <div className='cart-inner'>

        {/* Breadcrumb */}
        {step < 2 && (
          <div className='cart-breadcrumb'>
            <Link to='/'         className='cart-breadcrumb-link'>Home</Link>
            <span>›</span>
            <Link to='/products' className='cart-breadcrumb-link'>Products</Link>
            <span>›</span>
            <span className='cart-breadcrumb-current'>{step === 0 ? 'Cart' : 'Checkout'}</span>
          </div>
        )}

        <StepBar step={step} />

        {step === 0 && <CartStep     onProceed={() => setStep(1)} />}
        {step === 1 && <CheckoutStep onSuccess={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <SuccessStep />}
      </div>
    </div>
  )
}

export default Cart
