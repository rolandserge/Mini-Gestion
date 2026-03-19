import React from 'react';

const StatCard = ({ type, label, value, subtext, icon }) => {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-sub">{subtext}</div>
      <div className="stat-icon">{icon}</div>
    </div>
  );
};

const StatsGrid = ({ stats }) => {
  return (
    <div className="stats-grid">
      <StatCard 
        type="cyan"
        label="Total Tâches"
        value={stats.total}
        subtext="↑ +3 cette semaine"
        icon="📋"
      />
      <StatCard 
        type="green"
        label="Terminées"
        value={stats.done}
        subtext={`${((stats.done / stats.total) * 100).toFixed(1)}% du total`}
        icon="✓"
      />
      <StatCard 
        type="yellow"
        label="En cours"
        value={stats.inProgress}
        subtext={`${((stats.inProgress / stats.total) * 100).toFixed(1)}% du total`}
        icon="⚡"
      />
      <StatCard 
        type="pink"
        label="En retard"
        value={stats.late}
        subtext="⚠ Action requise"
        icon="⏰"
      />
    </div>
  );
};

export { StatsGrid, StatCard };
