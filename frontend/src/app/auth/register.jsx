import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import InputField from "../../components/inputField.jsx"
import { useTheme } from "../useTheme";
import { useAuth }  from "../../store/authStore.js";
import { useForm, useWatch } from "react-hook-form"
import { toast } from 'sonner';
import "../../styles/auth.css";

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
);

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

export default function Register() {

  const navigate = useNavigate();
  const { isDark, isMounted } = useTheme();

  const [showPw, setShowPw] = useState(false);

  const { registerAction, loading, error } = useAuth()

  const { register, control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onChange" })
  // watch sert à vérifier le mot de passe pour la confirmation.
  const password = useWatch({
    control,
    name: "password", // Le nom du champ à surveiller
  });

  const onSubmit = async(data) => {

    try {
        
        const res = await registerAction(data)

        if(res) {
          toast.success("Inscription réussie")
          navigate("/dashbord")
        }

    } catch (error) {
      toast.error("Erreur lors de l'inscription");
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
              Organisez.<br/>
              <span className="gradient-text">Accomplissez.</span>
            </h2>
            <p className="left-description">Rejoignez des milliers de professionnels qui font confiance à Task pour gérer leurs projets.</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="close-btn-container">
            <Link to="/" className="close-link">✕</Link>
          </div>

          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <h1 className={`form-title ${isMounted && !isDark ? 'light' : ''}`}>Créez votre compte</h1>
            <p className="form-description">Remplissez les informations pour créer votre compte.</p>

            <InputField
              label="Nom complet"
              inputType="text"
              id="name"
              placeholder="Jean Dupont"
              icon={<IconUser />}
              error={errors.name?.message}
              register={register}
              condition={{
                required: "Le nom est obligatoire",
                minLength: {
                  value: 2,
                  message: "Minimum 2 caractères"
                },
                maxLength: {
                  value: 50,
                  message: "Maximum 50 caractères"
                }
              }}
            />
            <InputField
              label="Adresse email"
              inputType="email"
              id="email"
              placeholder="jean@exemple.com"
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
              placeholder="Au moins 6 caractères"
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
            <InputField
              label="Confirmer le mot de passe" 
              inputType="password" 
              id="confirm"  
              placeholder="Répétez le mot de passe"  
              icon={<IconLock />} 
              showToggle
              showPw={showPw} 
              onTogglePw={() => setShowPw(v => !v)}
              error={errors.confirm?.message}
              register={register}
              condition={{
                required: "Confirmation obligatoire",
                validate: value =>
                  value === password || "Les mots de passe ne correspondent pas"
              }}
            />
            
            {error && (
              <div className="error-message">⚠ {error}</div>
            )} 
            <button type="submit"
              className="submit-btn"
              disabled={loading || !isValid}
            >
              {loading
                ? <>
                    <div className="loading-spinner" />
                    Création du compte...
                  </>
                : "Créer mon compte →"}
            </button>

            <div className="signup-text-container">
              <p className="signup-text">
                Déjà un compte ?
                <Link className="auth-link" 
                  to="/auth/login"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}