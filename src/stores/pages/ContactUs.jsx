import React, { useState } from 'react'

const WEB3FORMS_KEY = 'f92013a2-412f-492d-9ec6-d95c4b12988e'

const BRAND       = '#3B3562'
const BRAND_LIGHT = '#f0effe'

// ─── Reusable Input ───────────────────────────────────────────────────────────
const InputField = ({ label, type = 'text', name, value, onChange, error, placeholder, icon }) => (
  <div className='cu-field'>
    <label className='cu-field-label'>{label}</label>
    <div className='cu-field-wrap'>
      {icon && (
        <span className={`cu-field-icon${error ? ' cu-field-icon--error' : ''}`}>{icon}</span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`cu-input ${icon ? 'cu-input--with-icon' : 'cu-input--no-icon'}${error ? ' cu-input--error' : ''}`}
        onFocus={e => {
          e.target.style.border = `1.5px solid ${BRAND}`
          e.target.style.boxShadow = `0 0 0 3px ${BRAND}22`
          e.target.style.background = '#fff'
        }}
        onBlur={e => {
          e.target.style.border = `1.5px solid ${error ? '#EF4444' : '#E5E7EB'}`
          e.target.style.boxShadow = 'none'
          e.target.style.background = error ? '#FFF5F5' : '#F9FAFB'
        }}
      />
    </div>
    {error && <p className='cu-field-error'>⚠ {error}</p>}
  </div>
)

// ─── ContactUs ────────────────────────────────────────────────────────────────
const ContactUs = () => {
  const [form, setForm]           = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors]       = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [sendError, setSendError] = useState('')
  const isConfigured = WEB3FORMS_KEY !== 'YOUR_ACCESS_KEY'

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Full name is required'
    if (!form.email.trim())   e.email   = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
    if (form.phone && !/^[0-9+\-\s()]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message cannot be empty'
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
    if (sendError) setSendError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isConfigured) { setSendError('not_configured'); return }
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    setSendError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject:    `Contact Form: ${form.subject}`,
          from_name:  form.name,
          email:      form.email,
          phone:      form.phone || 'Not provided',
          message:    form.message,
        }),
      })
      const data = await res.json()
      if (data.success) { setSubmitted(true) }
      else { throw new Error(data.message || 'Submission failed') }
    } catch (err) {
      console.error('Web3Forms error:', err)
      setSendError('send_failed')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    setErrors({})
    setSubmitted(false)
    setSendError('')
  }

  return (
    <div className='container' style={{ padding: 0, fontFamily: "'Sora', sans-serif" }}>

      <div className='cu-root'>

        {/* ── Page Header ── */}
        <div className='cu-page-header'>
          {/* badge uses BRAND colors from JS — keep inline */}
          <span
            className='cu-badge'
            style={{ background: BRAND_LIGHT, color: BRAND }}
          >📬 Get In Touch</span>
          <h1 className='cu-title'>
            Contact <span style={{ color: BRAND }}>Us</span>
          </h1>
          <p className='cu-subtitle'>
            We're here to help with your shopping experience. Reach out and we'll respond within 24 hours.
          </p>
        </div>

        {/* ── Setup Banner ── */}
        {!isConfigured && (
          <div className='cu-setup-banner'>
            <span className='cu-setup-icon'>⚙️</span>
            <div>
              <div className='cu-setup-heading'>
                One-time setup needed — get your free Web3Forms key (2 minutes)
              </div>
              <ol className='cu-setup-list'>
                <li>Go to <a href='https://web3forms.com' target='_blank' rel='noreferrer' style={{ color: BRAND, fontWeight: 700 }}>https://web3forms.com</a></li>
                <li>Enter <strong>srinivasmura111@gmail.com</strong> → click <strong>"Create Access Key"</strong></li>
                <li>Copy the key from the page (or check your email)</li>
                <li>Open <code className='cu-setup-code'>ContactUs.jsx</code> and replace <code className='cu-setup-code'>YOUR_ACCESS_KEY</code> with it</li>
              </ol>
            </div>
          </div>
        )}

        {/* ── 2-Column Layout ── */}
        <div className='contact-grid'>

          {/* ════ LEFT — Form ════ */}
          <div className='cu-form-card cu-card' style={{ animationDelay: '0.1s' }}>
            {submitted ? (

              /* ── Success ── */
              <div className='cu-success'>
                <div className='cu-success-icon'>✅</div>
                <h2 className='cu-success-title'>Message Sent Successfully!</h2>
                <p className='cu-success-text'>Your message has been delivered to</p>
                {/* email badge uses BRAND colors — keep inline */}
                <span
                  className='cu-success-email'
                  style={{ background: BRAND_LIGHT, color: BRAND }}
                >📧 srinivasmura111@gmail.com</span>
                <p className='cu-success-note'>
                  We'll get back to you within <strong style={{ color: '#111827' }}>24 hours</strong>. 🎉
                </p>
                {/* reset button uses BRAND bg — keep inline */}
                <button
                  onClick={handleReset}
                  className='cu-reset-btn'
                  style={{ background: BRAND }}
                >Send Another Message</button>
              </div>

            ) : (

              /* ── Form ── */
              <>
                <h2 className='cu-form-title'>Send a Message</h2>
                <p className='cu-form-sub'>
                  Delivers directly to&nbsp;
                  <strong style={{ color: BRAND }}>srinivasmura111@gmail.com</strong>
                </p>

                {/* Error banners */}
                {sendError === 'not_configured' && (
                  <div className='cu-warn-banner'>
                    ⚠️ <strong>Access key not set.</strong> Follow the yellow setup banner above to get your free key, then paste it into <code>ContactUs.jsx</code>.
                  </div>
                )}
                {sendError === 'send_failed' && (
                  <div className='cu-error-banner'>
                    ⚠️ <strong>Failed to send.</strong> Check your internet connection and make sure your Web3Forms key is correct, then try again.
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <InputField label='Full Name *'             name='name'    value={form.name}    onChange={handleChange} placeholder='John Doe'           icon='👤' error={errors.name} />
                  <InputField label='Email Address *' type='email' name='email' value={form.email} onChange={handleChange} placeholder='you@example.com'    icon='✉️' error={errors.email} />
                  <InputField label='Phone (optional)'        name='phone'   value={form.phone}   onChange={handleChange} placeholder='+91 98765 43210'     icon='📱' error={errors.phone} />
                  <InputField label='Subject *'               name='subject' value={form.subject} onChange={handleChange} placeholder='How can we help?'    icon='💬' error={errors.subject} />

                  <div className='cu-field'>
                    <label className='cu-field-label'>Message *</label>
                    <textarea
                      name='message'
                      value={form.message}
                      onChange={handleChange}
                      placeholder='Write your message here...'
                      rows={5}
                      className={`cu-textarea${errors.message ? ' cu-textarea--error' : ''}`}
                      onFocus={e => {
                        e.target.style.border = `1.5px solid ${BRAND}`
                        e.target.style.boxShadow = `0 0 0 3px ${BRAND}22`
                        e.target.style.background = '#fff'
                      }}
                      onBlur={e => {
                        e.target.style.border = `1.5px solid ${errors.message ? '#EF4444' : '#E5E7EB'}`
                        e.target.style.boxShadow = 'none'
                        e.target.style.background = errors.message ? '#FFF5F5' : '#F9FAFB'
                      }}
                    />
                    {errors.message && <p className='cu-field-error'>⚠ {errors.message}</p>}
                  </div>

                  {/* submit button bg is dynamic (loading state) */}
                  <button
                    type='submit'
                    disabled={loading}
                    className='cu-submit-btn'
                    style={{ background: loading ? '#9CA3AF' : BRAND, boxShadow: loading ? 'none' : '0 4px 18px rgba(59,53,98,0.4)' }}
                  >
                    {loading ? (
                      <><span className='cu-spinner' />Sending…</>
                    ) : '📨 Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* ════ RIGHT — Info + Map ════ */}
          <div className='cu-info-right'>

            {/* Info card — bg uses BRAND */}
            <div className='cu-info-card cu-card' style={{ background: BRAND, animationDelay: '0.2s' }}>
              <h2 className='cu-info-title'>Contact Information</h2>
              <p className='cu-info-sub'>Reach us through any of the channels below.</p>

              {[
                { icon: '✉️', label: 'Email',         value: 'srinivasmura111@gmail.com',  href: 'mailto:srinivasmura111@gmail.com' },
                { icon: '📞', label: 'Phone',         value: '+91 85002 88819',             href: 'tel:+918500288819' },
                { icon: '🕐', label: 'Working Hours', value: 'Mon – Sat: 9 AM – 6 PM IST', href: null },
                { icon: '📍', label: 'Location',      value: 'Hyderabad, Telangana, India', href: null },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`info-item${item.href ? ' info-item--clickable' : ''}`}
                  style={{ marginBottom: i < 3 ? 22 : 0 }}
                  onClick={() => item.href && window.open(item.href)}
                >
                  <div className='info-icon'>{item.icon}</div>
                  <div>
                    <div className='info-detail-label'>{item.label}</div>
                    <div className='info-detail-value'>{item.value}</div>
                  </div>
                </div>
              ))}

              <div className='cu-social-bar'>
                {['📘', '🐦', '📸', '▶️'].map((icon, i) => (
                  <button key={i} className='cu-social-btn'>{icon}</button>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className='cu-map-card cu-card' style={{ animationDelay: '0.3s' }}>
              {/* map badge uses BRAND color */}
              <div className='cu-map-badge' style={{ color: BRAND }}>📍 Hyderabad, India</div>
              <iframe
                title='Our Location'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.31575808985!2d78.24323147089845!3d17.41250603854918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
                width='100%'
                height='100%'
                className='cu-iframe'
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </div>
          </div>
        </div>

        {/* ── FAQ Strip ── */}
        <div className='faq-grid'>
          {[
            { q: 'How quickly will you reply?', a: 'We aim to respond within 24 hours on business days.' },
            { q: 'Can I track my order?',       a: 'Yes! Use your order ID on our tracking page for live updates.' },
            { q: 'What is your return policy?', a: 'We offer hassle-free 30-day returns on all eligible items.' },
          ].map((item, i) => (
            <div
              key={i}
              className='faq-card'
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              {/* faq question uses BRAND color */}
              <div className='faq-question' style={{ color: BRAND }}>❓ {item.q}</div>
              <div className='faq-answer'>{item.a}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default ContactUs
