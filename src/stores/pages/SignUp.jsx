import { useState } from "react";
import logo from '../../assets/e-mart-logo.png';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (fields = { name, email, password, confirmPassword }) => {
    const newErrors = {};

    if (!fields.name.trim()) {
      newErrors.name = "Full name is required.";
    }

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

    if (!fields.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (fields.password !== fields.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleChange = (field, value) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);

    if (touched[field]) {
      const updated = { name, email, password, confirmPassword, [field]: value };
      setErrors(validate(updated));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);
    setTimeout(() => {
      const normalizedEmail = email.toLowerCase();

      const storedUsers = JSON.parse(localStorage.getItem("userCredentials") || "{}");

      if (storedUsers[normalizedEmail]) {
        setErrors({ form: "An account with this email already exists. Please sign in instead." });
        setIsLoading(false);
        return;
      }

      // Save password (used by Login.jsx) and name (for profile/greeting use)
      storedUsers[normalizedEmail] = password;
      localStorage.setItem("userCredentials", JSON.stringify(storedUsers));

      const storedNames = JSON.parse(localStorage.getItem("userNames") || "{}");
      storedNames[normalizedEmail] = name.trim();
      localStorage.setItem("userNames", JSON.stringify(storedNames));

      setIsLoading(false);
      navigate("/login", { replace: true, state: { signupSuccess: true } });
    }, 800);
  };

  return (
    <div className="login-page" style={{ marginTop: '-65px' }}>
      <div className="login-card">

        {/* Brand */}
        <div className="login-brand">
          <div className="login-logo">
            <img src={logo} alt="E-Mart" />
          </div>
          <h1 className="login-heading">Create your account</h1>
          <p className="login-subheading">Sign up to start shopping with us</p>
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

        <form onSubmit={handleSubmit} noValidate className="login-form">

          {/* Full name */}
          <div className="login-field-group">
            <label className="login-label" htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              className={`login-input${touched.name && errors.name ? " input-error" : ""}`}
            />
            {touched.name && errors.name && (
              <span className="login-error-msg">{errors.name}</span>
            )}
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              hasError={!!(touched.password && errors.password)}
            />
            {touched.password && errors.password && (
              <span className="login-error-msg">{errors.password}</span>
            )}
          </div>

          {/* Confirm password */}
          <div className="login-field-group">
            <label className="login-label" htmlFor="confirmPassword">Confirm password</label>
            <PasswordField
              id="confirmPassword"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              hasError={!!(touched.confirmPassword && errors.confirmPassword)}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <span className="login-error-msg">{errors.confirmPassword}</span>
            )}
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
                Creating account…
              </>
            ) : (
              "Sign Up"
            )}
          </button>

        </form>

        <p className="login-signup-text">
          Already have an account?{" "}
          <Link to="/login" className="login-signup-link">Sign In</Link>
        </p>

      </div>
    </div>
  );
};

/* ─── Password field with show/hide toggle (matches Login.jsx) ─── */
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

export default SignUp;
