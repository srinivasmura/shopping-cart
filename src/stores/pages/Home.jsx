import React, { useState, useEffect } from 'react'
import { useCart } from '../components/CartContext'

// ─── FakeStore API base ───────────────────────────────────────────────────────
const API = 'https://fakestoreapi.com'

// ─── Banner slides ────────────────────────────────────────────────────────────
const BANNERS = [
  {
    tag: '🔥 Flash Sale — Today Only',
    title: 'Up to 60% Off\nElectronics',
    sub: 'Premium gadgets at unreal prices. Limited stock available.',
    cta: 'Shop Electronics',
    accent: '#F4A261',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=90&fit=crop',
    cat: 'electronics',
  },
  {
    tag: '✨ New Season Collection',
    title: "Women's Fashion\nJust Arrived",
    sub: 'Curated styles for the modern woman. Free returns on all orders.',
    cta: "Shop Women's",
    accent: '#FBBF24',
    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=90&fit=crop',
    cat: "women's clothing",
  },
  {
    tag: '🏆 Best Sellers',
    title: 'Jewellery That\nTells Your Story',
    sub: 'Handpicked premium collections. Delivered in gift-ready packaging.',
    cta: 'Explore Jewellery',
    accent: '#34D399',
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=90&fit=crop',
    cat: 'jewelery',
  },
]

// ─── Category meta ────────────────────────────────────────────────────────────
const CAT_META = {
  "electronics": { icon: '⚡', color: '#DBEAFE', text: '#1D4ED8' },
  "jewelery": { icon: '💎', color: '#FDF4FF', text: '#7E22CE' },
  "men's clothing": { icon: '👔', color: '#ECFDF5', text: '#065F46' },
  "women's clothing": { icon: '👗', color: '#FFF1F2', text: '#9F1239' },
}

// ─── Stars ────────────────────────────────────────────────────────────────────
const Stars = ({ rate }) => {
  const full = Math.floor(rate)
  const half = rate - full >= 0.4
  return (
    <span className='stars'>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className='skeleton-card'>
    <div className='skeleton-img' />
    <div className='skeleton-body'>
      {[70, 90, 50].map((w, i) => (
        <div key={i} className='skeleton-line' style={{ width: `${w}%` }} />
      ))}
    </div>
  </div>
)

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, wishlisted, onWish }) => {
  const { addToCart, cartItems } = useCart()
  const [added, setAdded] = useState(false)
  const inCart = cartItems.find(c => c.id === product.id)

  const handleCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className='product-card'>
      <button onClick={() => onWish(product.id)} className='product-card-wish-btn'>
        {wishlisted ? '❤️' : '🤍'}
      </button>

      <div className='product-card-img-wrap'>
        <img src={product.image} alt={product.title} className='product-card-img' />
      </div>

      <div className='product-card-body'>
        <span className='product-card-category'>{product.category}</span>
        <p className='product-card-title'>{product.title}</p>

        <div className='product-card-rating'>
          <Stars rate={product.rating?.rate ?? 0} />
          <span className='product-card-count'>({product.rating?.count})</span>
        </div>

        <div className='product-card-footer'>
          <span className='product-card-price'>${product.price?.toFixed(2)}</span>
          <button
            onClick={handleCart}
            className={`add-to-cart-btn${added ? ' add-to-cart-btn--added' : inCart ? ' add-to-cart-btn--in-cart' : ''}`}
          >
            {added ? '✓ Added' : inCart ? `In Cart (${inCart.qty})` : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
const Home = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [catLoading, setCatLoading] = useState(false)
  const [bannerIdx, setBannerIdx] = useState(0)
  const [slideDir, setSlideDir] = useState('next')
  const [animKey, setAnimKey] = useState(0)
  const [wishlist, setWishlist] = useState([])

  const { totalCount, totalPrice, toastMsg, setPopupOpen } = useCart()

  useEffect(() => {
    fetch(`${API}/products`)
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false) })
      .catch(() => setLoading(false))
    fetch(`${API}/products/categories`)
      .then(r => r.json())
      .then(setCategories)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setSlideDir('next')
      setAnimKey(k => k + 1)
      setBannerIdx(i => (i + 1) % BANNERS.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const goPrev = () => { setSlideDir('prev'); setAnimKey(k => k + 1); setBannerIdx(i => (i - 1 + BANNERS.length) % BANNERS.length) }
  const goNext = () => { setSlideDir('next'); setAnimKey(k => k + 1); setBannerIdx(i => (i + 1) % BANNERS.length) }
  const goTo = (idx) => { setSlideDir(idx > bannerIdx ? 'next' : 'prev'); setAnimKey(k => k + 1); setBannerIdx(idx) }

  const handleCategory = (cat) => {
    setActiveCategory(cat)
    setCatLoading(true)
    const url = cat === 'all' ? `${API}/products` : `${API}/products/category/${encodeURIComponent(cat)}`
    fetch(url).then(r => r.json()).then(data => { setProducts(data); setCatLoading(false) })
  }

  const toggleWish = (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id])

  const banner = BANNERS[bannerIdx]
  const topRated = [...products].sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0)).slice(0, 4)

  return (
    <div className='container' style={{ padding: 0, fontFamily: "'Sora', sans-serif" }}>

      <div className='home-root'>

        {/* ══ HERO BANNER ══ */}
        <section className='hero-banner'>
          {BANNERS.map((slide, i) => (
            <div
              key={`${i}-${i === bannerIdx ? animKey : 'idle'}`}
              className={`hero-slide ${i === bannerIdx ? `hero-slide--active ${slideDir === 'next' ? 'slide-next' : 'slide-prev'}` : 'hero-slide--hidden'}`}
            >
              <img src={slide.img} alt={slide.title} className='hero-slide-img' />
              <div className='hero-slide-overlay' />
              <div className='hero-slide-content'>
                {/* Accent badge — color from data, keep inline */}
                <span style={{
                  display: 'inline-block', background: 'rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(6px)', color: slide.accent,
                  fontSize: '0.72rem', fontWeight: 700, padding: '5px 14px',
                  borderRadius: 999, letterSpacing: '1.2px', textTransform: 'uppercase',
                  marginBottom: 18, width: 'fit-content',
                  border: `1px solid ${slide.accent}44`,
                }}>{slide.tag}</span>
                <h2 className='banner-title'>{slide.title}</h2>
                <p className='hero-slide-sub'>{slide.sub}</p>
                <button onClick={() => handleCategory(slide.cat)} className='hero-cta-btn'>
                  {slide.cta} →
                </button>
              </div>
            </div>
          ))}

          {/* ── Left arrow ── */}
          <button onClick={goPrev} className='banner-arrow-btn banner-arrow-btn--left'>‹</button>

          {/* ── Right arrow ── */}
          <button onClick={goNext} className='banner-arrow-btn banner-arrow-btn--right'>›</button>

          {/* ── Dot indicators ── */}
          <div className='banner-dots'>
            {BANNERS.map((slide, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`banner-dot-btn ${i === bannerIdx ? 'banner-dot-btn--active' : 'banner-dot-btn--inactive'}`}
                /* active dot uses slide's accent color — must stay inline */
                style={{ background: i === bannerIdx ? slide.accent : undefined }}
              />
            ))}
          </div>

          {/* ── Counter badge ── */}
          <div className='banner-counter'>{bannerIdx + 1} / {BANNERS.length}</div>
        </section>

        {/* ══ TRUST BAR ══ */}
        <div className='trust-bar'>
          {[
            { icon: '🚚', label: 'Free Shipping', sub: 'On orders over $50' },
            { icon: '↩️', label: 'Easy Returns', sub: '30-day hassle-free' },
            { icon: '🔒', label: 'Secure Payment', sub: '100% protected' },
            { icon: '⭐', label: 'Top Rated', sub: '4.8 / 5 avg rating' },
          ].map((item, i, arr) => (
            <div key={i} className={`trust-bar-item${i < arr.length - 1 ? ' trust-bar-item--bordered' : ''}`}>
              <span className='trust-bar-icon'>{item.icon}</span>
              <div>
                <div className='trust-bar-label'>{item.label}</div>
                <div className='trust-bar-sub'>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ══ CATEGORIES ══ */}
        <section className='section-padding'>
          <div className='section-header'>
            <h2 className='section-title'>Shop by Category</h2>
            <span className='section-link' onClick={() => handleCategory('all')}>View All →</span>
          </div>
          <div className='cat-grid'>
            {categories.map(cat => {
              const meta = CAT_META[cat] ?? { icon: '🛍️', color: '#F3F4F6', text: '#374151' }
              const isActive = activeCategory === cat
              return (
                <div
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`cat-card${isActive ? ' cat-card--active' : ''}`}
                >
                  {/* icon bg color comes from data — keep inline */}
                  <div
                    className='cat-card-icon'
                    style={{ background: isActive ? 'rgba(255,255,255,0.12)' : meta.color }}
                  >{meta.icon}</div>
                  <div className='cat-card-label'>{cat}</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ══ FEATURED PRODUCTS ══ */}
        <section className='section-padding-lg'>
          <div className='products-header'>
            <div>
              <h2 className='section-title'>
                {activeCategory === 'all' ? 'Featured Products' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
              </h2>
              <p className='products-subtitle'>{products.length} products found</p>
            </div>
            <div className='pill-btns-group'>
              <button className={`pill-btn${activeCategory === 'all' ? ' active' : ''}`} onClick={() => handleCategory('all')}>All</button>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`pill-btn${activeCategory === cat ? ' active' : ''}`}
                  onClick={() => handleCategory(cat)}
                  style={{ textTransform: 'capitalize' }}
                >{cat}</button>
              ))}
            </div>
          </div>
          <div className='prod-grid'>
            {loading || catLoading
              ? Array(8).fill(0).map((_, i) => <Skeleton key={i} />)
              : products.map(p => <ProductCard key={p.id} product={p} wishlisted={wishlist.includes(p.id)} onWish={toggleWish} />)
            }
          </div>
        </section>

        {/* ══ TOP RATED ══ */}
        {!loading && topRated.length > 0 && (
          <section className='section-padding-lg'>
            <div className='section-header'>
              <h2 className='section-title'>⭐ Top Rated Picks</h2>
              <span className='section-link'>See More →</span>
            </div>
            <div className='prod-grid'>
              {topRated.map(p => <ProductCard key={`top-${p.id}`} product={p} wishlisted={wishlist.includes(p.id)} onWish={toggleWish} />)}
            </div>
          </section>
        )}

        {/* ══ NEWSLETTER ══ */}
        <section className='section-padding-lg'>
          <div className='newsletter-section'>
            <div className='newsletter-deco' />
            <div className='newsletter-text-group'>
              <span className='newsletter-badge'>💌 Members Only</span>
              <h3 className='newsletter-title'>Get 20% Off Your First Order</h3>
              <p className='newsletter-sub'>Subscribe to unlock exclusive deals, early access & more.</p>
            </div>
            <div className='newsletter-form'>
              <input type='email' placeholder='Enter your email...' className='newsletter-input' />
              <button className='newsletter-btn'>Claim Deal →</button>
            </div>
          </div>
        </section>

        {/* ══ FLOATING CART BUBBLE ══ */}
        {totalCount > 0 && (
          <div onClick={() => setPopupOpen(true)} className='cart-bubble'>
            <span className='cart-bubble-icon'>🛒</span>
            <span className='cart-bubble-count'>{totalCount} item{totalCount > 1 ? 's' : ''}</span>
            <span className='cart-bubble-price'>${totalPrice.toFixed(2)}</span>
          </div>
        )}

        {/* ══ TOAST ══ */}
        {toastMsg && (
          <div
            className='toast-msg'
            style={{ bottom: totalCount > 0 ? 90 : 28 }}
          >✓ {toastMsg}</div>
        )}

      </div>
    </div>
  )
}

export default Home
