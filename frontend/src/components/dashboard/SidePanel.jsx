import React from 'react';

const ProgressSection = ({ projects }) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">Avancement</div>
      </div>
      <div className="progress-section">
        <div className="progress-items">
          {projects.map((project, index) => (
            <div key={index} className="progress-row">
              <div className="progress-label">{project.name}</div>
              <div className="progress-bar-wrap">
                <div 
                  className="progress-bar-fill" 
                  style={{
                    width: `${project.progress}%`,
                    background: project.gradient
                  }}
                />
              </div>
              <div 
                className="progress-pct" 
                style={{color: project.color}}
              >
                {project.progress}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CalendarSection = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).toUpperCase();
  
  const generateCalendarDays = () => {
    const days = [];
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    
    // Previous month days
    const startDay = firstDay.getDay();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        day: prevLastDay.getDate() - i,
        inactive: true
      });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        day: i,
        today: i === currentDate.getDate(),
        hasTask: [4, 6, 11, 14, 18, 20, 24, 28].includes(i)
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        inactive: true
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">Calendrier</div>
      </div>
      <div className="calendar-section">
        <div className="cal-nav">
          <button className="cal-btn">◀</button>
          <div className="cal-month">{currentMonth}</div>
          <button className="cal-btn">▶</button>
        </div>
        <div className="cal-grid">
          {weekDays.map((day, index) => (
            <div key={index} className="cal-head">{day}</div>
          ))}
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`cal-day ${
                day.inactive ? 'inactive' : 
                day.today ? 'today' : 
                day.hasTask ? 'has-task' : ''
              }`}
            >
              {day.day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SidePanel = ({ projects }) => {
  return (
    <div className="side-col">
      <ProgressSection projects={projects} />
      <CalendarSection />
    </div>
  );
};

export { SidePanel, ProgressSection, CalendarSection };
