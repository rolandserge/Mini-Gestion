import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../../components/inputField.jsx"
import { useTheme } from "../useTheme";
import { useForm } from "react-hook-form"
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
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async(data) =>  {

    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

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
          <div className="close-btn-container">
            <span className="close-link" onClick={() => navigate("/")}>✕</span>
          </div>

          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <h1 className={`form-title ${isMounted && !isDark ? 'light' : ''}`}>Ravi de vous revoir</h1>
            <p className="form-description">Connectez-vous pour accéder à votre tableau de bord.</p>

            <InputField 
              label="Adresse email" 
              inputType="email"
              id="email"
              placeholder="jean@exemple.com" 
              icon={<IconMail />}
              icon={<IconMail />}
              error={errors.email?.message}
              register={register}
              condition={{
                required: "Email obligatoire",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email invalide"
                }
              }}
            />
            <InputField 
              label="Mot de passe"
              inputType="password" 
              id="password" 
              placeholder="••••••••"
              icon={<IconLock />} 
              showToggle
              showPw={showPw}
              onTogglePw={() => setShowPw(v => !v)}
              error={errors.password?.message}
              register={register}
              condition={{
                required: "Mot de passe obligatoire",
                minLength: {
                  value: 6,
                  message: "Minimum 6 caractères"
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                  message: "Doit contenir lettres et chiffres"
                }
              }}
            />
            {/* {err && (
              <div className="error-message">⚠ {err}</div>
            )} */}
            <button type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading
                ? <><div className="loading-spinner" />Connexion...</>
                : "Accéder au tableau de bord →"}
            </button>

            <div className="signup-text-container">
              <p className="signup-text">
                Pas encore de compte ?
                <Link 
                  className="auth-link" 
                  to="/auth/register"
                >
                    Inscrivez-vous
                  </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}