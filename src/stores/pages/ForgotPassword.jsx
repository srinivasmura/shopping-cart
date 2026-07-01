import { useState } from "react";
import logo from '../../assets/e-mart-logo.png';
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    setError(validationError);
    if (validationError) return;

    setIsLoading(true);
    setTimeout(() => {
      // No backend — pass the email forward via route state to the reset step
      navigate("/reset-password", { state: { email }, replace: true });
    }, 700);
  };

  return (
    <div className="login-page" style={{ marginTop: '-65px' }}>
      <div className="login-card">

        {/* Brand */}
        <div className="login-brand">
          <div className="login-logo">
            <img src={logo} alt="E-Mart" />
          </div>
          <h1 className="login-heading">Forgot password?</h1>
          <p className="login-subheading">Enter your email and we'll help you reset it</p>
        </div>

        {error && (
          <div className="login-form-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="login-form">

          <div className="login-field-group">
            <label className="login-label" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
              className={`login-input${error ? " input-error" : ""}`}
            />
          </div>

          <button type="submit" disabled={isLoading} className="login-submit-btn">
            {isLoading ? (
              <>
                <svg className="login-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Sending…
              </>
            ) : (
              "Continue"
            )}
          </button>

        </form>

        <p className="login-signup-text">
          Remembered your password?{" "}
          <Link to="/login" className="login-signup-link">Back to Sign In</Link>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;
