import React from 'react';

const TaskItem = ({ task, onToggleDone, onStatusChange }) => {
  const statusLabel = {
    todo: "À faire",
    inprogress: "En cours", 
    done: "Terminé"
  };

  const assigneeColor = {
    AM: "linear-gradient(135deg,#a855f7,#00f5ff)",
    SL: "linear-gradient(135deg,#ff2d78,#ff6b35)",
    MD: "linear-gradient(135deg,#00ffaa,#00f5ff)",
    JR: "linear-gradient(135deg,#ffd700,#ff6b35)",
    TK: "linear-gradient(135deg,#a855f7,#ff2d78)"
  };

  return (
    <div className="task-item" id={`task-${task.id}`}>
      <div 
        className={`task-check ${task.done ? 'done' : ''}`}
        onClick={() => onToggleDone(task.id)}
      >
        {task.done ? '✓' : ''}
      </div>
      <div className="task-body">
        <div className={`task-title ${task.done ? 'done' : ''}`}>
          {task.title}
        </div>
        <div className="task-meta">
          <span className={`badge ${task.status === 'todo' ? 'todo' : task.status === 'inprogress' ? 'inprogress' : 'done-badge'}`}>
            {statusLabel[task.status]}
          </span>
          <span className={`prio ${task.priority}`}>
            {task.priority.toUpperCase()}
          </span>
          <select 
            className="task-status-select"
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
          >
            <option value="todo">À faire</option>
            <option value="inprogress">En cours</option>
            <option value="done">Terminé</option>
          </select>
        </div>
      </div>
      <div 
        className="task-assignee" 
        style={{background: assigneeColor[task.assignee] || 'linear-gradient(135deg,#a855f7,#ff2d78)'}}
      >
        {task.assignee}
      </div>
    </div>
  );
};

const TaskList = ({ tasks, onToggleDone, onStatusChange, filters, onFilterChange }) => {
  const filteredTasks = tasks.filter(task => {
    const statusMatch = !filters.status || task.status === filters.status;
    const priorityMatch = !filters.priority || task.priority === filters.priority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">Tâches</div>
        <div className="panel-count">
          {filteredTasks.length} tâche{filteredTasks.length !== 1 ? 's' : ''}
        </div>
        <div className="filter-bar">
          <select 
            className="filter-select"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="">Statut</option>
            <option value="todo">À faire</option>
            <option value="inprogress">En cours</option>
            <option value="done">Terminé</option>
          </select>
          <select 
            className="filter-select"
            value={filters.priority}
            onChange={(e) => onFilterChange('priority', e.target.value)}
          >
            <option value="">Priorité</option>
            <option value="haute">Haute</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
          </select>
        </div>
      </div>
      <div className="task-list">
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleDone={onToggleDone}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export { TaskList, TaskItem };
