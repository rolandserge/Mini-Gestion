import React, { useState } from 'react';

const TaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'moyenne',
    assignee: 'AM'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onAddTask(formData);
    setFormData({
      title: '',
      description: '',
      priority: 'moyenne',
      assignee: 'AM'
    });
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-title">✦ Nouvelle Tâche</div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Titre</label>
            <input
              type="text"
              className="form-input"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Nom de la tâche..."
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez la tâche..."
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Priorité</label>
              <select
                className="form-select"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="basse">🟢 Basse</option>
                <option value="moyenne">🟡 Moyenne</option>
                <option value="haute">🔴 Haute</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Assigné à</label>
              <select
                className="form-select"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
              >
                <option value="AM">Alex M.</option>
                <option value="SL">Sophie L.</option>
                <option value="MD">Marc D.</option>
                <option value="JR">Julie R.</option>
                <option value="TK">Tom K.</option>
              </select>
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              Créer la tâche
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
