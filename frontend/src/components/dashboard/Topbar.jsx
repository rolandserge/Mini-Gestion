import React from 'react';

const Topbar = ({ onNewTask, searchTerm, onSearchChange }) => {
  return (
    <div className="topbar">
      <div className="breadcrumb">DASHBOARD <span>/ ACCUEIL</span></div>
      <div className="topbar-search">
        <span style={{color:'var(--text-muted)', fontSize:'13px'}}>🔍</span>
        <input 
          type="text" 
          placeholder="Rechercher une tâche..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="topbar-actions">
        <button className="btn-primary" onClick={onNewTask}>
          + Nouvelle tâche
        </button>
      </div>
    </div>
  );
};

export default Topbar;
