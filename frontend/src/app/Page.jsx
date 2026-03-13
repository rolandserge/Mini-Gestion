import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./useTheme";

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
  html, body { margin:0; padding:0; width:100%; min-height:100vh; background:var(--bg-primary, #05080f); font-family:'DM Sans',sans-serif; overflow-x:hidden; }
  #root { width:100%; min-height:100vh; }
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
  @keyframes slideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes orb{0%,100%{transform:scale(1) translate(0,0)}50%{transform:scale(1.07) translate(12px,-12px)}}
  @keyframes glow{0%,100%{box-shadow:0 0 25px rgba(99,102,241,.3)}50%{box-shadow:0 0 55px rgba(99,102,241,.6)}}
  @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes popIn{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:scale(1)}}
  :root {
    --bg-primary: #05080f;
    --bg-secondary: rgba(5,8,15,.82);
    --text-primary: white;
    --text-secondary: #64748b;
    --border-color: rgba(99,102,241,.12);
    --accent-color: #6366f1;
    --accent-light: #4f46e5;
  }
  [data-theme="light"] {
    --bg-primary: #f4f5fb;
    --bg-secondary: rgba(244,245,251,.92);
    --text-primary: #0f172a;
    --text-secondary: #64748b;
    --border-color: rgba(99,102,241,.18);
    --accent-color: #6366f1;
    --accent-light: #4f46e5;
  }
`;

export default function Page() {
  const navigate = useNavigate();
  const { theme, setTheme, isDark } = useTheme();
  const [hov, setHov] = useState(null);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const bg       = isDark ? "var(--bg-primary)" : "var(--bg-primary)";
  const navBg    = isDark ? "var(--bg-secondary)" : "var(--bg-secondary)";
  const navBord  = isDark ? "var(--border-color)" : "var(--border-color)";
  const textH    = isDark ? "var(--text-primary)" : "var(--text-primary)";
  const textSub  = "var(--text-secondary)";
  const cardBg   = isDark ? "linear-gradient(145deg,rgba(15,20,40,.85),rgba(10,15,30,.85))" : "linear-gradient(145deg,rgba(255,255,255,.95),rgba(240,242,255,.95))";
  const cardBord = isDark ? "var(--border-color)" : "var(--border-color)";
  const cardBordH= isDark ? "rgba(99,102,241,.4)" : "rgba(99,102,241,.5)";
  const cardBgH  = isDark ? "linear-gradient(145deg,rgba(99,102,241,.13),rgba(139,92,246,.07))" : "linear-gradient(145deg,rgba(99,102,241,.07),rgba(139,92,246,.03))";
  const iconTxt  = isDark ? "#818cf8" : "#6366f1";
  const dropBg   = isDark ? "#0d1220" : "#ffffff";
  const dropBord = isDark ? "var(--border-color)" : "var(--border-color)";
  const dropTxt  = isDark ? "#94a3b8" : "#475569";

  const themeIcon = theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "💻";
  const themes = [
    { key:"light",  icon:"☀️", label:"Lumineux" },
    { key:"dark",   icon:"🌙", label:"Sombre" },
    { key:"system", icon:"💻", label:"Système" },
  ];

  const feats = [
    { icon:"⬡", t:"Suivi en temps réel", d:"Visualisez l'avancement de chaque tâche instantanément." },
    { icon:"◈", t:"Priorités claires",   d:"Classez vos tâches par urgence, ne ratez aucune échéance." },
    { icon:"◎", t:"Vue d'ensemble",      d:"Un tableau de bord complet pour piloter votre productivité." },
  ];

  return (
    <>
      <style>{G}</style>
      <div
        data-theme={isDark ? "dark" : "light"}
        style={{ minHeight:"100vh", overflowY:"auto", overflowX:"hidden", background:bg, position:"relative", width:"100%", transition:"background .3s" }}
        onClick={() => showThemeMenu && setShowThemeMenu(false)}
      >
        {/* Orbs */}
        <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
          <div style={{ position:"absolute", top:"-8%", left:"-4%", width:"500px", height:"500px", borderRadius:"50%", background: isDark ? "radial-gradient(circle,rgba(99,102,241,.14) 0%,transparent 70%)" : "radial-gradient(circle,rgba(99,102,241,.07) 0%,transparent 70%)", animation:"orb 12s ease-in-out infinite" }} />
          <div style={{ position:"absolute", bottom:"-12%", right:"-4%", width:"560px", height:"560px", borderRadius:"50%", background: isDark ? "radial-gradient(circle,rgba(139,92,246,.1) 0%,transparent 70%)" : "radial-gradient(circle,rgba(139,92,246,.05) 0%,transparent 70%)", animation:"orb 16s ease-in-out infinite 3s" }} />
        </div>

        {/* NAV */}
        <nav style={{ position:"sticky", top:0, zIndex:100, background:navBg, backdropFilter:"blur(20px)", borderBottom:`1px solid ${navBord}`, height:"66px", width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", paddingLeft:"clamp(16px,3vw,40px)", paddingRight:"clamp(16px,3vw,40px)", transition:"background .3s,border-color .3s" }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:"11px" }}>
            <div style={{ width:"38px", height:"38px", borderRadius:"11px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:"18px", color:"white", boxShadow:"0 4px 18px rgba(99,102,241,.5)", animation:"glow 3s ease-in-out infinite" }}>T</div>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"20px", color:textH, letterSpacing:"-0.5px", transition:"color .3s" }}>Task<span style={{ color: isDark ? "#6366f1" : "#4f46e5" }}>.</span></span>
          </div>

          {/* Droite */}
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            {/* Theme dropdown */}
            <div style={{ position:"relative" }} onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setShowThemeMenu(v => !v)}
                style={{ width:"40px", height:"38px", borderRadius:"10px", border:`1px solid ${navBord}`, background: isDark ? "rgba(99,102,241,.09)" : "rgba(255,255,255,.8)", cursor:"pointer", fontSize:"17px", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s", boxShadow: showThemeMenu ? "0 0 0 2px rgba(99,102,241,.4)" : "none" }}>
                {themeIcon}
              </button>
              {showThemeMenu && (
                <div style={{ position:"absolute", top:"calc(100% + 8px)", right:0, width:"160px", background:dropBg, border:`1px solid ${dropBord}`, borderRadius:"14px", padding:"6px", boxShadow: isDark ? "0 16px 40px rgba(0,0,0,.6)" : "0 16px 40px rgba(0,0,0,.12)", animation:"popIn .2s cubic-bezier(.34,1.56,.64,1)", zIndex:200 }}>
                  {themes.map(t => (
                    <button key={t.key} onClick={() => { setTheme(t.key); setShowThemeMenu(false); }}
                      style={{ width:"100%", padding:"9px 12px", border:"none", borderRadius:"9px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:500, display:"flex", alignItems:"center", gap:"10px", transition:"background .15s", background: theme===t.key ? "linear-gradient(135deg,rgba(99,102,241,.25),rgba(139,92,246,.15))" : "transparent", color: theme===t.key ? "#a5b4fc" : dropTxt }}>
                      <span style={{ fontSize:"16px" }}>{t.icon}</span>
                      {t.label}
                      {theme===t.key && <span style={{ marginLeft:"auto", color:"#6366f1", fontSize:"14px" }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate("/register")}
              onMouseEnter={e => { e.currentTarget.style.transform="scale(1.07)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(99,102,241,.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 4px 18px rgba(99,102,241,.4)"; }}
              style={{ padding:"10px 22px", borderRadius:"10px", border:"none", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"white", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:"14px", boxShadow:"0 4px 18px rgba(99,102,241,.4)", transition:"transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s", whiteSpace:"nowrap" }}>
              Créer un compte
            </button>
          </div>
        </nav>

        {/* CONTENT */}
        <div style={{ position:"relative", zIndex:1, maxWidth:"1100px", margin:"0 auto", padding:"0 clamp(16px,4vw,48px)" }}>

          {/* HERO */}
          <div style={{ textAlign:"center", padding:"clamp(64px,10vh,120px) 0 clamp(48px,7vh,80px)", animation:"slideUp .6s ease .1s both" }}>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(26px,3.5vw,50px)", lineHeight:1.1, letterSpacing:"-1.5px", color:textH, margin:"0 auto", maxWidth:"600px", transition:"color .3s" }}>
              Gérez vos tâches<br />
              <span style={{ background:"linear-gradient(135deg,#6366f1 0%,#a78bfa 50%,#38bdf8 100%)", backgroundSize:"200% 200%", animation:"gradShift 4s ease infinite", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>avec précision.</span>
            </h1>
            <p style={{ color:textSub, fontSize:"clamp(14px,1.3vw,16px)", maxWidth:"440px", margin:"clamp(18px,3vh,28px) auto 0", lineHeight:1.75, transition:"color .3s" }}>
              Une plateforme élégante pour organiser, prioriser et suivre vos projets. Rejoignez des milliers d'équipes qui font confiance à Task.
            </p>
          </div>

          {/* FEATURES */}
          <div style={{ paddingBottom:"clamp(64px,10vh,120px)", animation:"slideUp .6s ease .22s both" }}>
            <div style={{ textAlign:"center", marginBottom:"clamp(28px,4vh,44px)" }}>
              <p style={{ color:"#6366f1", fontSize:"11px", fontWeight:600, letterSpacing:"2.5px", textTransform:"uppercase", marginBottom:"8px" }}>Fonctionnalités</p>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(20px,2.2vw,28px)", color:textH, letterSpacing:"-0.5px", transition:"color .3s" }}>Tout ce dont vous avez besoin</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"clamp(14px,2vw,22px)" }}>
              {feats.map((f,i) => (
                <div key={i}
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                  style={{ background:hov===i ? cardBgH : cardBg, border:`1px solid ${hov===i ? cardBordH : cardBord}`, borderRadius:"18px", padding:"clamp(22px,3vh,32px) clamp(18px,2vw,26px)", transition:"all .3s", transform:hov===i?"translateY(-5px)":"none", boxShadow:hov===i ? (isDark?"0 20px 50px rgba(99,102,241,.18)":"0 20px 50px rgba(99,102,241,.1)") : (isDark?"none":"0 2px 12px rgba(0,0,0,.06)"), cursor:"default", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={{ width:"46px", height:"46px", borderRadius:"13px", background: isDark ? "rgba(99,102,241,.1)" : "rgba(99,102,241,.08)", border:`1px solid ${isDark?"rgba(99,102,241,.18)":"rgba(99,102,241,.2)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", marginBottom:"14px", color:iconTxt }}>{f.icon}</div>
                  <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"clamp(14px,1.2vw,16px)", color:textH, marginBottom:"8px", transition:"color .3s" }}>{f.t}</h3>
                  <p style={{ color:textSub, fontSize:"clamp(12px,1vw,14px)", lineHeight:1.65, transition:"color .3s" }}>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop:`1px solid ${isDark?"rgba(99,102,241,.08)":"rgba(99,102,241,.12)"}`, padding:"20px", textAlign:"center", position:"relative", zIndex:1 }}>
          <p style={{ color: isDark ? "#1e293b" : "#cbd5e1", fontSize:"12px" }}>
            Task<span style={{ color: isDark ? "#6366f1" : "#4f46e5" }}>.</span> — Votre gestionnaire de tâches intelligent
          </p>
        </div>
      </div>
    </>
  );
}