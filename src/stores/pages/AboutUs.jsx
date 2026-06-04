import React, { useState } from 'react'

const BRAND = '#3B3562'
const BRAND_LIGHT = '#f0effe'

const STATS = [
  { value: '2M+',   label: 'Happy Customers',    icon: '😊' },
  { value: '50K+',  label: 'Products Listed',     icon: '📦' },
  { value: '500+',  label: 'Cities Delivered',    icon: '🚚' },
  { value: '4.9★',  label: 'Average Rating',      icon: '⭐' },
]

const VALUES = [
  { icon: '🛡️', title: 'Trust & Safety',       color: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8',
    desc: 'Every transaction is secured with industry-grade encryption. Shop with complete peace of mind.' },
  { icon: '⚡', title: 'Lightning Fast Delivery', color: '#FFF7ED', border: '#FED7AA', text: '#C2410C',
    desc: 'Same-day dispatch on 90% of orders. Real-time tracking so you know exactly where your order is.' },
  { icon: '💎', title: 'Premium Quality',         color: '#FDF4FF', border: '#E9D5FF', text: '#7E22CE',
    desc: 'Every product passes a strict quality check. If it isn\'t perfect, we don\'t list it.' },
  { icon: '♻️', title: 'Eco-Conscious',           color: '#ECFDF5', border: '#A7F3D0', text: '#065F46',
    desc: 'Sustainable packaging and carbon-neutral shipping across all our delivery routes.' },
  { icon: '🎯', title: 'Personalised for You',    color: '#FFF1F2', border: '#FECDD3', text: '#9F1239',
    desc: 'AI-powered recommendations that learn your taste and surface deals you\'ll actually love.' },
  { icon: '🤝', title: 'Support 24 / 7',          color: '#F0FDF4', border: '#BBF7D0', text: '#166534',
    desc: 'Our real human support team is available round the clock — no bots, no canned replies.' },
]

const MILESTONES = [
  { year: '2018', event: 'Founded in Hyderabad with just 12 products and a bold dream.' },
  { year: '2019', event: 'Crossed 10,000 orders and expanded to 50 cities across India.' },
  { year: '2021', event: 'Launched mobile app — 1M downloads in the first 3 months.' },
  { year: '2023', event: 'Introduced same-day delivery in 20 major metro cities.' },
  { year: '2025', event: 'Celebrating 2 million happy customers and 50,000+ products.' },
]

const HIGHLIGHTS = [
  { label: 'Free shipping',        detail: 'on every order above ₹499',       emoji: '📦' },
  { label: '30-day easy returns',  detail: 'no questions asked',               emoji: '↩️' },
  { label: 'Exclusive member deals', detail: 'up to 70% off for subscribers', emoji: '🏷️' },
  { label: 'Verified sellers only', detail: 'every seller is vetted by us',   emoji: '✅' },
  { label: '1000+ new arrivals',   detail: 'added every single week',          emoji: '✨' },
  { label: 'Secure payments',      detail: 'UPI, cards, wallets & EMI',        emoji: '🔒' },
]

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('story')

  return (
    <div className='container' style={{ padding: 0, fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');
        .au-root * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn  { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
        .au-fade { animation: fadeUp 0.5s ease both; }
        .val-card:hover { transform: translateY(-5px) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.1) !important; }
        .val-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .stat-box:hover .stat-num { transform: scale(1.08); }
        .stat-num { transition: transform 0.2s ease; display:inline-block; }
        mark {
          background: linear-gradient(120deg, #fde68a 0%, #fbbf24 100%);
          padding: 0 4px 1px; border-radius: 4px;
          color: #111827; font-style: normal;
        }
        .highlight-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; border-radius: 12px;
          padding: 14px 18px; border: 1.5px solid #E5E7EB;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: all 0.22s ease;
          cursor: default;
        }
        .highlight-chip:hover {
          border-color: ${BRAND};
          box-shadow: 0 4px 18px rgba(59,53,98,0.15);
          transform: translateY(-2px);
        }
        .tab-btn { padding:10px 22px; border-radius:50px; border:1.5px solid #E5E7EB; background:#fff; font-size:0.82rem; font-weight:700; cursor:pointer; transition:all 0.2s; font-family:'Sora',sans-serif; color:#6B7280; }
        .tab-btn.active { background:${BRAND}; color:#fff; border-color:${BRAND}; box-shadow:0 4px 14px rgba(59,53,98,0.3); }
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr!important}
          .val-grid{grid-template-columns:repeat(2,1fr)!important}
          .stat-grid{grid-template-columns:repeat(2,1fr)!important}
          .hl-grid{grid-template-columns:repeat(2,1fr)!important}
        }
        @media(max-width:480px){
          .val-grid{grid-template-columns:1fr!important}
          .hl-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      <div className='au-root' style={{ background: '#F8F9FC', minHeight: '100vh' }}>

        {/* ══ HERO SECTION ══ */}
        <section style={{
          background: `linear-gradient(135deg, ${BRAND} 0%, #5a4f9f 60%, #7c6fc4 100%)`,
          padding: '70px 5% 80px',
          position: 'relative', overflow: 'hidden',
          textAlign: 'center',
        }}>
          {/* Decorative circles */}
          <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'rgba(255,255,255,0.04)', top:-120, right:-60, pointerEvents:'none' }} />
          <div style={{ position:'absolute', width:250, height:250, borderRadius:'50%', background:'rgba(255,255,255,0.04)', bottom:-80, left:-40, pointerEvents:'none' }} />

          <div className='au-fade' style={{ position:'relative', zIndex:1 }}>
            <span style={{
              display:'inline-block', background:'rgba(255,255,255,0.15)', backdropFilter:'blur(6px)',
              color:'#FDE68A', fontSize:'0.72rem', fontWeight:700,
              padding:'5px 18px', borderRadius:999, letterSpacing:'1.5px',
              textTransform:'uppercase', marginBottom:20,
              border:'1px solid rgba(255,255,255,0.2)',
            }}>🛍️ Our Story</span>
            <h1 style={{
              fontFamily:"'Playfair Display', serif",
              fontSize:'3rem', fontWeight:800, color:'#fff',
              lineHeight:1.12, marginBottom:18, letterSpacing:'-1.5px',
            }}>
              Shopping, <em>Reimagined</em><br />
              <span style={{ color:'#FDE68A' }}>For Every Indian Home</span>
            </h1>
            <p style={{
              fontSize:'1rem', color:'rgba(255,255,255,0.72)',
              lineHeight:1.75, maxWidth:600, margin:'0 auto 32px',
            }}>
              We started with one belief — that <mark>great shopping shouldn't be a luxury</mark>. Today we deliver joy to over 2 million homes across India.
            </p>
          </div>

          {/* Stats bar */}
          <div className='stat-grid' style={{
            display:'grid', gridTemplateColumns:'repeat(4,1fr)',
            gap:16, maxWidth:900, margin:'0 auto',
            position:'relative', zIndex:1,
          }}>
            {STATS.map((s, i) => (
              <div key={i} className='stat-box au-fade' style={{
                background:'rgba(255,255,255,0.12)', backdropFilter:'blur(8px)',
                borderRadius:20, padding:'22px 16px', textAlign:'center',
                border:'1px solid rgba(255,255,255,0.18)',
                animationDelay: `${0.15 + i * 0.08}s`,
              }}>
                <div style={{ fontSize:'1.8rem', marginBottom:6 }}>{s.icon}</div>
                <div className='stat-num' style={{ fontFamily:"'Playfair Display', serif", fontSize:'1.8rem', fontWeight:800, color:'#fff', letterSpacing:'-0.5px' }}>{s.value}</div>
                <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.6)', fontWeight:600, marginTop:4, textTransform:'uppercase', letterSpacing:'0.6px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ TAB NAV ══ */}
        <div style={{ padding:'32px 5% 0', display:'flex', justifyContent:'center', gap:10, flexWrap:'wrap' }}>
          {[
            { id:'story',  label:'📖 Our Story' },
            { id:'values', label:'💡 Our Values' },
            { id:'highlights', label:'🏷️ Why Choose Us' },
          ].map(tab => (
            <button key={tab.id} className={`tab-btn${activeTab===tab.id?' active':''}`}
              onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
          ))}
        </div>

        {/* ══ OUR STORY TAB ══ */}
        {activeTab === 'story' && (
          <section style={{ padding:'40px 5% 60px', maxWidth:1100, margin:'0 auto' }}>
            <div className='hero-grid' style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'center', marginBottom:60 }}>
              {/* Image */}
              <div className='au-fade' style={{ borderRadius:24, overflow:'hidden', boxShadow:'0 12px 40px rgba(0,0,0,0.12)' }}>
                <img
                  src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=85&fit=crop'
                  alt='Shopping experience'
                  style={{ width:'100%', height:360, objectFit:'cover', display:'block' }}
                />
              </div>
              {/* Text */}
              <div className='au-fade' style={{ animationDelay:'0.15s' }}>
                <span style={{ display:'inline-block', background:BRAND_LIGHT, color:BRAND, fontSize:'0.7rem', fontWeight:700, padding:'4px 14px', borderRadius:999, letterSpacing:'1px', textTransform:'uppercase', marginBottom:16 }}>
                  How It All Began
                </span>
                <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'2rem', fontWeight:800, color:'#111827', lineHeight:1.2, marginBottom:16, letterSpacing:'-0.5px' }}>
                  A Small Idea That <mark>Changed Everything</mark>
                </h2>
                <p style={{ fontSize:'0.9rem', color:'#6B7280', lineHeight:1.8, marginBottom:16 }}>
                  In 2018, three friends in Hyderabad noticed a gap — online shopping was either too expensive, unreliable, or complicated. They decided to fix it.
                </p>
                <p style={{ fontSize:'0.9rem', color:'#6B7280', lineHeight:1.8, marginBottom:20 }}>
                  Today, our platform brings together <mark>50,000+ products</mark> from verified sellers, with same-day delivery to 500+ cities. From everyday essentials to luxury finds, we've got it all — at prices that feel fair.
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                  {['Verified Sellers', 'Real Reviews', 'Price Match', 'No Hidden Fees'].map(tag => (
                    <span key={tag} style={{ background:BRAND_LIGHT, color:BRAND, fontSize:'0.74rem', fontWeight:700, padding:'6px 14px', borderRadius:999 }}>✓ {tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ background:'#fff', borderRadius:24, padding:'36px 32px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:'1.5rem', fontWeight:800, color:'#111827', marginBottom:28, textAlign:'center' }}>
                Our <mark>Journey</mark> So Far
              </h3>
              <div style={{ position:'relative' }}>
                {/* vertical line */}
                <div style={{ position:'absolute', left:56, top:0, bottom:0, width:2, background:`linear-gradient(to bottom, ${BRAND}, #E5E7EB)` }} />
                {MILESTONES.map((m, i) => (
                  <div key={i} className='au-fade' style={{
                    display:'flex', gap:24, marginBottom: i < MILESTONES.length-1 ? 28 : 0,
                    animationDelay: `${i * 0.1}s`,
                  }}>
                    <div style={{
                      width:48, height:48, borderRadius:'50%', flexShrink:0,
                      background: BRAND, color:'#fff',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'0.72rem', fontWeight:800, letterSpacing:'-0.3px',
                      boxShadow:`0 0 0 4px ${BRAND_LIGHT}`,
                      position:'relative', zIndex:1,
                      marginLeft:8,
                    }}>{m.year}</div>
                    <div style={{
                      background:'#F9FAFB', borderRadius:14, padding:'14px 18px',
                      flex:1, border:'1.5px solid #F3F4F6',
                      fontSize:'0.88rem', color:'#374151', lineHeight:1.6, fontWeight:500,
                    }}>{m.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══ OUR VALUES TAB ══ */}
        {activeTab === 'values' && (
          <section style={{ padding:'40px 5% 60px', maxWidth:1100, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:40 }}>
              <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'2rem', fontWeight:800, color:'#111827', letterSpacing:'-0.5px', marginBottom:10 }}>
                What We <mark>Stand For</mark>
              </h2>
              <p style={{ fontSize:'0.9rem', color:'#9CA3AF', maxWidth:480, margin:'0 auto', lineHeight:1.7 }}>
                These aren't just words on a wall. They're the principles behind every decision we make.
              </p>
            </div>
            <div className='val-grid' style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
              {VALUES.map((v, i) => (
                <div key={i} className='val-card au-fade' style={{
                  background:'#fff', borderRadius:20, padding:'28px 24px',
                  border:`1.5px solid ${v.border}`,
                  boxShadow:'0 2px 12px rgba(0,0,0,0.05)',
                  animationDelay:`${i * 0.08}s`,
                }}>
                  <div style={{ width:56, height:56, borderRadius:16, background:v.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', marginBottom:16 }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontSize:'1rem', fontWeight:800, color:v.text, marginBottom:8 }}>{v.title}</h3>
                  <p style={{ fontSize:'0.84rem', color:'#6B7280', lineHeight:1.7 }}>{v.desc}</p>
                </div>
              ))}
            </div>

            {/* Quote strip */}
            <div style={{
              marginTop:40, background:`linear-gradient(135deg,${BRAND} 0%,#5a4f9f 100%)`,
              borderRadius:24, padding:'40px 5%', textAlign:'center',
              position:'relative', overflow:'hidden',
            }}>
              <div style={{ position:'absolute', width:300, height:300, borderRadius:'50%', background:'rgba(255,255,255,0.04)', top:-100, right:-60 }} />
              <p style={{ fontFamily:"'Playfair Display', serif", fontStyle:'italic', fontSize:'1.4rem', color:'#fff', lineHeight:1.5, maxWidth:680, margin:'0 auto 16px', position:'relative', zIndex:1 }}>
                "We don't just sell products. We deliver <span style={{ color:'#FDE68A' }}>experiences, trust, and happiness</span> — right to your doorstep."
              </p>
              <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.55)', fontWeight:600, letterSpacing:'0.5px', position:'relative', zIndex:1 }}>— Founder & CEO, kart.</p>
            </div>
          </section>
        )}

        {/* ══ WHY CHOOSE US TAB ══ */}
        {activeTab === 'highlights' && (
          <section style={{ padding:'40px 5% 60px', maxWidth:1100, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:40 }}>
              <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'2rem', fontWeight:800, color:'#111827', letterSpacing:'-0.5px', marginBottom:10 }}>
                Why Millions <mark>Choose kart.</mark>
              </h2>
              <p style={{ fontSize:'0.9rem', color:'#9CA3AF', maxWidth:480, margin:'0 auto', lineHeight:1.7 }}>
                Here's what makes us different from every other online store out there.
              </p>
            </div>

            <div className='hl-grid' style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:40 }}>
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} className='highlight-chip au-fade' style={{ animationDelay:`${i*0.07}s` }}>
                  <span style={{ fontSize:'1.5rem', flexShrink:0 }}>{h.emoji}</span>
                  <div>
                    <div style={{ fontSize:'0.84rem', fontWeight:800, color:'#111827' }}>{h.label}</div>
                    <div style={{ fontSize:'0.72rem', color:'#9CA3AF', marginTop:2 }}>{h.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Full-width image banner */}
            <div style={{ borderRadius:24, overflow:'hidden', position:'relative', height:320, boxShadow:'0 12px 40px rgba(0,0,0,0.13)' }}>
              <img
                src='https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=85&fit=crop'
                alt='Shopping'
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,rgba(59,53,98,0.82) 0%,rgba(59,53,98,0.25) 70%,transparent 100%)' }} />
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 5%', maxWidth:500 }}>
                <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:'1.8rem', fontWeight:800, color:'#fff', marginBottom:12, lineHeight:1.2 }}>
                  Ready to Experience <span style={{ color:'#FDE68A' }}>Better Shopping?</span>
                </h3>
                <p style={{ fontSize:'0.88rem', color:'rgba(255,255,255,0.72)', marginBottom:22, lineHeight:1.65 }}>
                  Join 2 million+ happy shoppers. <mark>Your first order ships free.</mark>
                </p>
                <button style={{
                  padding:'12px 26px', background:'#FDE68A', color:'#1A1A2E',
                  border:'none', borderRadius:50, fontWeight:800, fontSize:'0.9rem',
                  cursor:'pointer', fontFamily:"'Sora',sans-serif",
                  width:'fit-content', letterSpacing:'0.3px',
                  boxShadow:'0 4px 18px rgba(253,230,138,0.5)',
                }}>
                  🛍️ Start Shopping →
                </button>
              </div>
            </div>

            {/* Team section */}
            <div style={{ marginTop:40, textAlign:'center' }}>
              <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:'1.5rem', fontWeight:800, color:'#111827', marginBottom:8 }}>
                The <mark>People</mark> Behind kart.
              </h3>
              <p style={{ fontSize:'0.84rem', color:'#9CA3AF', marginBottom:28, lineHeight:1.7 }}>A passionate team of 200+ across tech, logistics, and customer happiness.</p>
              <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:20 }}>
                {[
                  { name:'Srinivas M.', role:'Founder & CEO',         emoji:'👨‍💼' },
                  { name:'Priya K.',    role:'Head of Technology',     emoji:'👩‍💻' },
                  { name:'Arjun S.',   role:'VP of Operations',       emoji:'👨‍🔧' },
                  { name:'Meera R.',   role:'Customer Happiness Lead', emoji:'👩‍🎤' },
                ].map((p, i) => (
                  <div key={i} className='au-fade' style={{
                    background:'#fff', borderRadius:20, padding:'24px 28px',
                    textAlign:'center', boxShadow:'0 2px 12px rgba(0,0,0,0.06)',
                    border:'1.5px solid #F3F4F6', minWidth:160,
                    animationDelay:`${i*0.1}s`,
                  }}>
                    <div style={{ fontSize:'2.5rem', marginBottom:10 }}>{p.emoji}</div>
                    <div style={{ fontSize:'0.88rem', fontWeight:800, color:'#111827', marginBottom:4 }}>{p.name}</div>
                    <div style={{ fontSize:'0.72rem', color:'#9CA3AF', fontWeight:600 }}>{p.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  )
}

export default AboutUs
