import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/inputField.jsx"
// import { useTheme } from "./useTheme";


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
  // const { isDark } = useTheme();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [err,      setErr]      = useState("");

  // const bg    = isDark ? "#05080f" : "#f4f5fb";
  // const textH = isDark ? "white"   : "#0f172a";

  const submit = () => {
    setErr("");
    if (!name || !email || !password)       { setErr("Veuillez remplir tous les champs."); return; }
    if (password !== confirm)               { setErr("Les mots de passe ne correspondent pas."); return; }
    if (password.length < 6)               { setErr("Le mot de passe doit faire au moins 6 caractères."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/login"); }, 1400);
  };

  return (
    <>
      {/* <style>{G}</style> */}
      <div style={{ width:"100vw", height:"100vh", background: "#05080f", display:"flex", position:"relative", overflow:"hidden", transition:"background .3s" }}>

        {/* Orbs */}
        <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
          <div style={{ position:"absolute", top:"-8%", left:"-4%", width:"580px", height:"580px", borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,.15) 0%,transparent 70%)", animation:"orb 12s ease-in-out infinite" }} />
          <div style={{ position:"absolute", bottom:"-12%", right:"-4%", width:"650px", height:"650px", borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,.11) 0%,transparent 70%)", animation:"orb 16s ease-in-out infinite 3s" }} />
        </div>

        {/* LEFT PANEL */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"60px", position:"relative", borderRight:"1px solid rgba(99,102,241,.08)", zIndex:1 }}>
          <div style={{ position:"absolute", top:"18%", left:"8%", width:"260px", height:"260px", borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,.2) 0%,transparent 70%)", animation:"floatY 8s ease-in-out infinite" }} />
          <div style={{ position:"absolute", bottom:"14%", right:"12%", width:"180px", height:"180px", borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,.16) 0%,transparent 70%)", animation:"floatY 11s ease-in-out infinite 2s" }} />
          <div style={{ position:"relative", zIndex:1, textAlign:"center", maxWidth:"380px" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:"40px" }}>
              <div style={{ width:"68px", height:"68px", borderRadius:"22px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:"32px", color:"white", boxShadow:"0 8px 40px rgba(99,102,241,.5)", animation:"glow 3s ease-in-out infinite" }}>T</div>
            </div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"38px", color: "white", letterSpacing:"-1.5px", lineHeight:1.12, marginBottom:"16px" }}>
              Organisez.<br/>
              <span style={{ background:"linear-gradient(135deg,#6366f1,#a78bfa,#38bdf8)", backgroundSize:"200%", animation:"gradShift 4s ease infinite", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Accomplissez.</span>
            </h2>
            <p style={{ color:"#475569", fontSize:"14px", lineHeight:1.75 }}>Rejoignez des milliers de professionnels qui font confiance à Task pour gérer leurs projets.</p>
            <div style={{ marginTop:"40px", background:"rgba(99,102,241,.07)", border:"1px solid rgba(99,102,241,.14)", borderRadius:"16px", padding:"20px 22px", textAlign:"left" }}>
              <p style={{ color:"#94a3b8", fontSize:"14px", lineHeight:1.7, fontStyle:"italic" }}>"Task a transformé la façon dont mon équipe collabore. Nous sommes 40% plus productifs."</p>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginTop:"14px" }}>
                <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:"14px", fontWeight:700 }}>M</div>
                <div>
                  <div style={{ color:"white", fontSize:"13px", fontWeight:600 }}>Marie Laurent</div>
                  <div style={{ color:"#334155", fontSize:"12px" }}>CTO, TechCorp</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width:"480px", display:"flex", flexDirection:"column", justifyContent:"center", padding:"60px 50px", position:"relative", zIndex:1, overflowY:"auto" }}>
          <button onClick={() => navigate("/")}
            onMouseEnter={e => { e.currentTarget.style.transform="scale(1.14)"; e.currentTarget.style.boxShadow="0 0 22px rgba(239,68,68,.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="scale(1)";    e.currentTarget.style.boxShadow="0 4px 14px rgba(239,68,68,.28)"; }}
            style={{ position:"absolute", top:"24px", right:"24px", width:"40px", height:"40px", borderRadius:"50%", border:"none", background:"linear-gradient(135deg,#ef4444,#dc2626)", color:"white", cursor:"pointer", fontSize:"18px", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 14px rgba(239,68,68,.28)", transition:"transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s", zIndex:10 }}>✕
          </button>

          <div style={{ animation:"slideUp .5s ease" }}>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"26px", color: "white", letterSpacing:"-0.8px", marginBottom:"6px" }}>Créez votre compte ✦</h1>
            <p style={{ color:"#475569", fontSize:"14px", marginBottom:"28px" }}>Commencez gratuitement, sans carte de crédit.</p>

            <InputField
              label="Nom complet"
              inputType="text"
              id="name"
              placeholder="Jean Dupont"
              icon={<IconUser />}
              value={name}
              onChange={setName}
              onEnter={submit} 
            />
            <InputField
              label="Adresse email"
              inputType="email"
              id="email"
              placeholder="jean@exemple.com"
              icon={<IconMail />}
              value={email}
              onChange={setEmail}
              onEnter={submit}
            />
            <InputField
              label="Mot de passe"
              inputType="password"
              id="password"
              placeholder="Au moins 6 caractères"
              icon={<IconLock />} value={password}
              onChange={setPassword} onEnter={submit}
              showToggle
              showPw={showPw}
              onTogglePw={() => setShowPw(v => !v)}
            />
            <InputField
              label="Confirmer le mot de passe" 
              inputType="password" id="confirm"  
              placeholder="Répétez le mot de passe"  
              icon={<IconLock />} 
              value={confirm}
              onChange={setConfirm}
              onEnter={submit} 
              showToggle
              showPw={showPw} 
              onTogglePw={() => setShowPw(v => !v)}
            />

            {err && (
              <div style={{ background:"rgba(248,113,113,.09)", border:"1px solid rgba(248,113,113,.22)", borderRadius:"10px", padding:"11px 15px", marginBottom:"14px", color:"#f87171", fontSize:"13px" }}>⚠ {err}</div>
            )}

            <button onClick={submit}
              style={{ width:"100%", padding:"15px", borderRadius:"12px", border:"none", cursor:loading?"not-allowed":"pointer", background:loading?"rgba(99,102,241,.35)":"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"white", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"15px", boxShadow:loading?"none":"0 8px 28px rgba(99,102,241,.4)", transition:"all .2s", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px" }}>
              {loading
                ? <><div style={{ width:"16px", height:"16px", borderRadius:"50%", border:"2px solid rgba(255,255,255,.3)", borderTopColor:"white", animation:"spin .8s linear infinite" }} />Création du compte...</>
                : "Créer mon compte →"}
            </button>

            <p style={{ textAlign:"center", marginTop:"22px", color:"#475569", fontSize:"13px" }}>
              Déjà un compte ?{" "}
              <span className="auth-link" onClick={() => navigate("/auth/login")}>Se connecter</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}