import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (fields = { email, password }) => {
    const newErrors = {};
    if (!fields.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!fields.password) {
      newErrors.password = "Password is required.";
    } else if (fields.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleChange = (field, value) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (touched[field]) {
      const updated = field === "email" ? { email: value, password } : { email, password: value };
      setErrors(validate(updated));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);
    setTimeout(() => {
      // Any valid email + password (6+ chars) can log in
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      navigate("/home", { replace: true });
    }, 800);
  };

  return (
    <div className="login-page" style={{ marginTop: '-65px' }}>
      <div className="login-card">

        {/* Brand */}
        <div className="login-brand">
          <div className="login-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="login-heading">Welcome back</h1>
          <p className="login-subheading">Sign in to your account to continue</p>
        </div>

        {/* Global form error */}
        {errors.form && (
          <div className="login-form-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {errors.form}
          </div>
        )}

        <form onSubmit={handleLogin} noValidate className="login-form">

          {/* Email */}
          <div className="login-field-group">
            <label className="login-label" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`login-input${touched.email && errors.email ? " input-error" : ""}`}
            />
            {touched.email && errors.email && (
              <span className="login-error-msg">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="login-field-group">
            <label className="login-label" htmlFor="password">Password</label>
            <PasswordField
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              hasError={!!(touched.password && errors.password)}
            />
            {touched.password && errors.password && (
              <span className="login-error-msg">{errors.password}</span>
            )}
          </div>

          {/* Forgot password */}
          <div className="login-forgot-wrap">
            <Link to="/forgot-password" className="login-forgot-link">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="login-submit-btn"
          >
            {isLoading ? (
              <>
                <svg className="login-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

        <p className="login-signup-text">
          Don't have an account?{" "}
          <Link to="/contact" className="login-signup-link">Sign Up</Link>
        </p>

      </div>
    </div>
  );
};

/* ─── Password field with show/hide toggle ─── */
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

export default Login;
