import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  // If someone lands here directly without going through ForgotPassword, send them back
  if (!email) {
    return (
      <div className="login-page" style={{ marginTop: '-65px' }}>
        <div className="login-card">
          <div className="login-brand">
            <h1 className="login-heading">Session expired</h1>
            <p className="login-subheading">Please restart the password reset process.</p>
          </div>
          <Link to="/forgot-password" className="login-submit-btn" style={{ textDecoration: "none", display: "flex", justifyContent: "center" }}>
            Go to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const newErrors = {};
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);
    setTimeout(() => {
      // Store password against this email — Login.jsx checks this on next sign-in
      const storedUsers = JSON.parse(localStorage.getItem("userCredentials") || "{}");
      storedUsers[email.toLowerCase()] = password;
      localStorage.setItem("userCredentials", JSON.stringify(storedUsers));

      setIsLoading(false);
      setDone(true);

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    }, 700);
  };

  if (done) {
    return (
      <div className="login-page" style={{ marginTop: '-65px' }}>
        <div className="login-card" style={{ textAlign: "center" }}>
          <div className="login-brand">
            <div className="login-logo" style={{ background: "#10B981" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 className="login-heading">Password updated</h1>
            <p className="login-subheading">Redirecting you to sign in…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page" style={{ marginTop: '-65px' }}>
      <div className="login-card">

        <div className="login-brand">
          <div className="login-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="login-heading">Set a new password</h1>
          <p className="login-subheading">For <strong>{email}</strong></p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="login-form">

          <div className="login-field-group">
            <label className="login-label" htmlFor="newPassword">New password</label>
            <PasswordField
              id="newPassword"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
              hasError={!!errors.password}
            />
            {errors.password && <span className="login-error-msg">{errors.password}</span>}
          </div>

          <div className="login-field-group">
            <label className="login-label" htmlFor="confirmPassword">Confirm password</label>
            <PasswordField
              id="confirmPassword"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); if (errors.confirmPassword) setErrors((p) => ({ ...p, confirmPassword: undefined })); }}
              hasError={!!errors.confirmPassword}
            />
            {errors.confirmPassword && <span className="login-error-msg">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" disabled={isLoading} className="login-submit-btn">
            {isLoading ? (
              <>
                <svg className="login-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Updating…
              </>
            ) : (
              "Update password"
            )}
          </button>

        </form>

        <p className="login-signup-text">
          <Link to="/login" className="login-signup-link">Back to Sign In</Link>
        </p>

      </div>
    </div>
  );
};

/* Reuses the same eye-toggle password field style as Login.jsx */
const PasswordField = ({ hasError, ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="login-password-wrap">
      <input
        {...props}
        type={show ? "text" : "password"}
        className={`login-input login-input--password${hasError ? " input-error" : ""}`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="login-eye-btn"
      >
        {show ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ResetPassword;
