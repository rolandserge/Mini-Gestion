import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/inputField.jsx"
import { useTheme } from "../useTheme";
import "../../styles/auth.css";

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);

export default function Login() {

  const navigate = useNavigate();
  const { isDark, isMounted } = useTheme();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [err,      setErr]      = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: ""
  });

  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const yahooRegex = /^[a-zA-Z0-9._%+-]+@yahoo\.com$/;
    return gmailRegex.test(email) || yahooRegex.test(email);
  };

  const submit = () => {
    // Reset field errors
    setFieldErrors({ email: "", password: "" });
    setErr("");
    
    let hasError = false;
    const newErrors = { email: "", password: "" };
    
    // Validate email
    if (!email) {
      newErrors.email = "Veuillez remplir votre adresse email.";
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Seules les adresses Gmail et Yahoo sont acceptées.";
      hasError = true;
    }
    
    // Validate password
    if (!password) {
      newErrors.password = "Veuillez remplir votre mot de passe.";
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = "Le mot de passe doit faire au moins 6 caractères.";
      hasError = true;
    }
    
    setFieldErrors(newErrors);
    
    if (!hasError) {
      setLoading(true);
      setTimeout(() => { setLoading(false); /* navigate("/dashboard") */ }, 1400);
    }
  };

  return (
    <>
      <div className={`login-container ${isMounted && !isDark ? 'light' : ''}`}>

        {/* Orbs */}
        <div className="orb">
          <div className="orb-1"></div>
          <div className="orb-2"></div>
        </div>

        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="floating-orb-1"></div>
          <div className="floating-orb-2"></div>
          <div className="left-content">
            <h2 className={`left-title ${isMounted && !isDark ? 'light' : ''}`}>
              Bon retour.<br/>
              <span className="gradient-text">Ravi de vous revoir.</span>
            </h2>
            <p className="left-description">Reconnectez-vous pour accéder à votre tableau de bord et reprendre là où vous avez été arrêté.</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <button 
            onClick={() => navigate("/")}
            className="close-btn"
          >
            ✕
          </button>

          <div className="form-container">
            <h1 className={`form-title ${isMounted && !isDark ? 'light' : ''}`}>Ravi de vous revoir</h1>
            <p className="form-description">Connectez-vous pour accéder à votre tableau de bord.</p>

            <InputField 
              label="Adresse email" 
              inputType="email"
              id="email"
              placeholder="jean@exemple.com" 
              icon={<IconMail />} 
              value={email}
              onChange={setEmail}
              onEnter={submit}
              error={fieldErrors.email}
            />
            <InputField 
              label="Mot de passe"
              inputType="password" 
              id="password" 
              placeholder="••••••••"
              icon={<IconLock />} 
              value={password} 
              onChange={setPassword}
              onEnter={submit}
              showToggle
              showPw={showPw}
              onTogglePw={() => setShowPw(v => !v)}
              error={fieldErrors.password}
            />

            {err && (
              <div className="error-message">⚠ {err}</div>
            )}

            <button 
              onClick={submit}
              className="submit-btn"
              disabled={loading}
            >
              {loading
                ? <><div className="loading-spinner" />Connexion...</>
                : "Accéder au tableau de bord →"}
            </button>

            <div className="signup-text-container">
              <p className="signup-text">
                Pas encore de compte ?{" "}
                <span className="auth-link" onClick={() => navigate("/auth/register")}>Inscrivez-vous</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}