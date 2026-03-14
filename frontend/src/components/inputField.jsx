import React from 'react'

const IconEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
  </svg>
);
const IconEyeOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.74C21.27 7.61 17 4.5 12 4.5c-1.24 0-2.43.2-3.54.57l2.17 2.17C11.12 7.1 11.55 7 12 7zM2 4.27l2.28 2.28.46.46A11.8 11.8 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16a3 3 0 0 0-3-3l-.17.01z"/>
  </svg>
);

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
  html,body{margin:0;padding:0;width:100%;height:100%;font-family:'DM Sans',sans-serif;overflow:hidden;}
  #root{width:100%;height:100%;}
  *,*::before,*::after{box-sizing:border-box;}
  @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes glow{0%,100%{box-shadow:0 0 25px rgba(99,102,241,.3)}50%{box-shadow:0 0 55px rgba(99,102,241,.6)}}
  @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes orb{0%,100%{transform:scale(1) translate(0,0)}50%{transform:scale(1.07) translate(12px,-12px)}}
  input:-webkit-autofill{-webkit-box-shadow:0 0 0 1000px #0d1220 inset!important;-webkit-text-fill-color:white!important;}
  .login-input{width:100%;padding:14px 46px 14px 44px;border-radius:12px;border:1px solid rgba(99,102,241,.18);background:#0d1220;color:white;font-family:'DM Sans',sans-serif;font-size:15px;outline:none;transition:border-color .2s,box-shadow .2s;}
  .login-input:focus{border-color:rgba(99,102,241,.6);box-shadow:0 0 0 3px rgba(99,102,241,.12);}
  .login-input.error{border-color:#f87171;background:rgba(248,113,113,.08);}
  .login-input.error:focus{border-color:#f87171;box-shadow:0 0 0 3px rgba(248,113,113,.12);}
  .login-input::placeholder{color:#475569;}
  .auth-link{color:#818cf8;cursor:pointer;font-weight:600;text-decoration:none;position:relative;transition:color .2s;}
  .auth-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:linear-gradient(90deg,#6366f1,#a78bfa);transition:width .25s ease;}
  .auth-link:hover{color:#a5b4fc;}
  .auth-link:hover::after{width:100%;}
`;


export default function InputField({id, showPw, className, inputType, value, showToggle, placeholder, onTogglePw, label, icon, onChange, onEnter, error}) {

    return (
        <>
            <style>{G}</style>
            <div style={{ marginBottom: "18px"}}>
                <label htmlFor={id} style={{ display:"block", color:"#64748b", fontSize:"11px", fontWeight:600, marginBottom:"7px", letterSpacing:"0.6px", textTransform:"uppercase" }}>{label}</label>
                <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%", color:"#475569", display:"flex", alignItems:"center", pointerEvents:"none" }}>{icon}</span>
                    <input
                        id={id} 
                        name={id}
                        className={`login-input ${error ? 'error' : ''}`}
                        type={showToggle ? (showPw ? "text" : "password") : inputType}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && onEnter()}
                        placeholder={placeholder}
                        autoComplete={id === "email" ? "email" : "current-password"}
                    />
                    {showToggle && (
                        <button type="button" onClick={onTogglePw}
                            style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%", background:"none", border:"none", color:"#475569", cursor:"pointer", display:"flex", alignItems:"center", padding:"6px", borderRadius:"6px", transition:"color .15s" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#818cf8")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#475569")}>
                            {showPw ? <IconEyeOff /> : <IconEye />}
                        </button>
                    )}
                </div>
                {error && (
                    <div style={{ 
                        color: "#f87171", 
                        fontSize: "12px", 
                        marginTop: "6px", 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "4px" 
                    }}>
                        <span style={{ fontSize: "14px" }}>⚠</span>
                        {error}
                    </div>
                )}
            </div>
        </>
    )
}
