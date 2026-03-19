import React from 'react';

const Sidebar = ({ user, activeNav, onNavClick }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-text">⚡ TaskFlow</div>
        <div className="logo-sub">v2.0 Dashboard</div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Navigation</div>
        <div 
          className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`}
          onClick={() => onNavClick('dashboard')}
        >
          <span className="nav-icon">⊞</span> Dashboard
        </div>
        <div 
          className={`nav-item ${activeNav === 'tasks' ? 'active' : ''}`}
          onClick={() => onNavClick('tasks')}
        >
          <span className="nav-icon">✓</span> Mes Tâches <span className="nav-badge">8</span>
        </div>
        <div 
          className={`nav-item ${activeNav === 'projects' ? 'active' : ''}`}
          onClick={() => onNavClick('projects')}
        >
          <span className="nav-icon">◈</span> Projets
        </div>
        <div 
          className={`nav-item ${activeNav === 'team' ? 'active' : ''}`}
          onClick={() => onNavClick('team')}
        >
          <span className="nav-icon">⊡</span> Équipe
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Projets</div>
        <div 
          className={`nav-item ${activeNav === 'alpha' ? 'active' : ''}`}
          onClick={() => onNavClick('alpha')}
        >
          <span className="nav-icon" style={{color:'var(--accent-cyan)'}}>●</span> Alpha
        </div>
        <div 
          className={`nav-item ${activeNav === 'beta' ? 'active' : ''}`}
          onClick={() => onNavClick('beta')}
        >
          <span className="nav-icon" style={{color:'var(--accent-pink)'}}>●</span> Beta
        </div>
        <div 
          className={`nav-item ${activeNav === 'gamma' ? 'active' : ''}`}
          onClick={() => onNavClick('gamma')}
        >
          <span className="nav-icon" style={{color:'var(--accent-green)'}}>●</span> Gamma
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Système</div>
        <div 
          className={`nav-item ${activeNav === 'settings' ? 'active' : ''}`}
          onClick={() => onNavClick('settings')}
        >
          <span className="nav-icon">⚙</span> Paramètres
        </div>
        <div 
          className={`nav-item ${activeNav === 'forum' ? 'active' : ''}`}
          onClick={() => onNavClick('forum')}
        >
          <span className="nav-icon">◎</span> Forum <span className="nav-badge">3</span>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AM'}
          </div>
          <div>
            <div className="user-name">{user?.name || 'Alex Martin'}</div>
            <div className="user-role">{user?.role || 'Chef de projet'}</div>
          </div>
          <span className="pulse" style={{marginLeft:'auto'}}></span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
