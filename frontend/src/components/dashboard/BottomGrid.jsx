import React, { useEffect, useRef } from 'react';

const ChartSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Simple chart drawing (you can replace with Chart.js if needed)
    const data = [
      { label: 'Lun', created: 3, done: 1, late: 0 },
      { label: 'Mar', created: 5, done: 3, late: 1 },
      { label: 'Mer', created: 2, done: 4, late: 0 },
      { label: 'Jeu', created: 7, done: 5, late: 2 },
      { label: 'Ven', created: 4, done: 6, late: 1 },
      { label: 'Sam', created: 1, done: 2, late: 0 },
      { label: 'Dim', created: 3, done: 4, late: 1 }
    ];

    // Simple bar chart implementation
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const barWidth = (width - padding * 2) / (data.length * 3 + data.length - 1);
    const maxValue = 8;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw bars
    data.forEach((item, index) => {
      const x = padding + index * (barWidth * 3 + barWidth);
      
      // Created bars
      const createdHeight = (item.created / maxValue) * (height - padding * 2);
      ctx.fillStyle = '#00f5ff';
      ctx.fillRect(x, height - padding - createdHeight, barWidth, createdHeight);
      
      // Done bars
      const doneHeight = (item.done / maxValue) * (height - padding * 2);
      ctx.fillStyle = '#a855f7';
      ctx.fillRect(x + barWidth, height - padding - doneHeight, barWidth, doneHeight);
      
      // Late bars
      const lateHeight = (item.late / maxValue) * (height - padding * 2);
      ctx.fillStyle = '#ff2d78';
      ctx.fillRect(x + barWidth * 2, height - padding - lateHeight, barWidth, lateHeight);
    });

  }, []);

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">Activité hebdomadaire</div>
      </div>
      <div className="chart-wrap">
        <div className="chart-canvas-wrap">
          <canvas 
            ref={canvasRef}
            width={400}
            height={160}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }) => {
  return (
    <div className="activity-item">
      <div 
        className="activity-dot" 
        style={{background: activity.color}}
      />
      <div>
        <div className="activity-text">
          <strong>{activity.user}</strong> {activity.action}
        </div>
        <div className="activity-time">{activity.time}</div>
      </div>
    </div>
  );
};

const ActivitiesSection = () => {
  const activities = [
    {
      user: "Sophie L.",
      action: 'a terminé "API Auth module"',
      time: "il y a 12 min",
      color: "var(--accent-green)"
    },
    {
      user: "Marc D.",
      action: 'a créé "Dashboard v2 design"',
      time: "il y a 34 min",
      color: "var(--accent-cyan)"
    },
    {
      user: "Alex M.",
      action: 'a assigné "Migration DB" à <strong>Julie R.</strong>',
      time: "il y a 1h",
      color: "var(--accent-pink)"
    },
    {
      user: "Julie R.",
      action: 'a changé la priorité de "CI/CD Pipeline" → <strong>Haute</strong>',
      time: "il y a 2h",
      color: "var(--accent-yellow)"
    },
    {
      user: "Tom K.",
      action: 'a commenté "Refactor auth service"',
      time: "il y a 3h",
      color: "var(--accent-purple)"
    }
  ];

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">Activités récentes</div>
      </div>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
};

const BottomGrid = () => {
  return (
    <div className="bottom-grid">
      <ChartSection />
      <ActivitiesSection />
    </div>
  );
};

export { BottomGrid, ChartSection, ActivitiesSection, ActivityItem };
