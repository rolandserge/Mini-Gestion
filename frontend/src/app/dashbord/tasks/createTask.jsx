import React, { useState } from 'react'
import { MdClose, MdCheckCircleOutline } from 'react-icons/md'


const statuses = [
     { key: 'pending',   label: 'En attente', dotColor: '#854F0B', cls: 'cs-pending'  },
     { key: 'progress',  label: 'En cours',   dotColor: '#185FA5', cls: 'cs-progress' },
     { key: 'done',      label: 'Terminé',    dotColor: '#3B6D11', cls: 'cs-done'     },
     // { key: 'cancelled', label: 'Annulé',     dotColor: '#A32D2D', cls: 'cs-cancel'   },
]
 
const priorities = [
     { key: 'high',   label: 'Haute',   icon: '🔴', cls: 'cp-high'   },
     { key: 'medium', label: 'Moyenne', icon: '🟠', cls: 'cp-medium' },
     { key: 'low',    label: 'Basse',   icon: '🟢', cls: 'cp-low'    },
]

// membres fictifs — à remplacer par props ou API
const DEFAULT_MEMBERS = [
     { id: 1, initials: 'JD', name: 'John Doe',       color: '#534AB7' },
     { id: 2, initials: 'AM', name: 'Alice Martin',   color: '#1D9E75' },
     { id: 3, initials: 'KL', name: 'Kevin Leblanc',  color: '#378ADD' },
     { id: 4, initials: 'SR', name: 'Sophie Richard', color: '#E24B4A' },
]
export default function CreateTask({ onClose, onCreate, members = DEFAULT_MEMBERS }) {

     const [name, setName] = useState('')
     const [description, setDescription] = useState('')
     const [status, setStatus] = useState('pending')
     const [priority, setPriority] = useState('medium')
     const [assignees, setAssignees] = useState([])
     
     const toggleAssignee = (id) => {
          setAssignees(prev =>
               prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
          )
     }
     
     const handleSubmit = () => {
          if (!name.trim()) return
          onCreate?.({ name, description, status, priority, assignees })
          onClose?.()
     }

     return (
          <div className="ctm-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
               <div className="ctm">
                    {/* ── Header ── */}
                    <div className="ctm__header">
                         <div className="ctm__icon">
                              <MdCheckCircleOutline />
                         </div>
                         <div className="ctm__header-text">
                              <h2 className="ctm__title">Ajouter une tâche</h2>
                              <p className="ctm__subtitle">Remplissez les informations de la tâche</p>
                         </div>
                         <button className="ctm__close" onClick={onClose}><MdClose /></button>
                    </div>
                    {/* ── Body ── */}
                    <form className="ctm__body">
                         {/* Nom */}
                         <div className="ctm__field">
                              <label className="ctm__label">
                                   Nom de la tâche <span className="ctm__required">*</span>
                              </label>
                              <input
                                   className="ctm__input"
                                   type="text"
                                   placeholder="Ex : Intégration API paiement…"
                                   value={name}
                                   onChange={e => setName(e.target.value)}
                                   autoFocus
                              />
                         </div>
                         {/* Description */}
                         <div className="ctm__field">
                              <label className="ctm__label">Description</label>
                              <textarea
                                   className="ctm__input ctm__input--textarea"
                                   placeholder="Décrivez les détails de la tâche…"
                                   maxLength={300}
                                   value={description}
                                   onChange={e => setDescription(e.target.value)}
                              />
                              <p className="ctm__char-count">{description.length} / 300</p>
                         </div>
                         {/* Statut + Priorité */}
                         <div className="ctm__row-2">
                              <div className="ctm__field">
                                   <label className="ctm__label">Statut</label>
                                   <div className="ctm__chips">
                                        {statuses.map(s => (
                                             <button
                                                  type='button'
                                                  key={s.key}
                                                  className={`ctm__chip ctm__chip--${s.key}${status === s.key ? ' ctm__chip--active' : ''}`}
                                                  onClick={() => setStatus(s.key)}
                                             >
                                                  <span className="ctm__chip-dot" style={{ background: s.dotColor }} />
                                                  {s.label}
                                             </button>
                                        ))}
                                   </div>
                              </div>
                              <div className="ctm__field">
                                   <label className="ctm__label">Priorité</label>
                                   <div className="ctm__chips">
                                        {priorities.map(p => (
                                             <button
                                                  key={p.key}
                                                  type='button'
                                                  className={`ctm__chip ctm__chip--${p.key}${priority === p.key ? ' ctm__chip--active' : ''}`}
                                                  onClick={() => setPriority(p.key)}
                                             >
                                                  <span className="ctm__chip-icon">{p.icon}</span>
                                                  {p.label}
                                             </button>
                                        ))}
                                   </div>
                              </div>
               
                         </div>
                         {/* Assignés */}
                         <div className="ctm__field">
                              <label className="ctm__label">Assigner à</label>
                              <div className="ctm__assignees">
                                   {members.map(m => (
                                        <button
                                             key={m.id}
                                             type='button'
                                             className={`ctm__assignee${assignees.includes(m.id) ? ' ctm__assignee--active' : ''}`}
                                             onClick={() => toggleAssignee(m.id)}
                                        >
                                             <div className="ctm__assignee-avatar" style={{ background: m.color }}>
                                                  {m.initials}
                                             </div>
                                             <span className="ctm__assignee-name">{m.name}</span>
                                             {assignees.includes(m.id) && (
                                                  <span className="ctm__assignee-check">✓</span>
                                             )}
                                        </button>
                                   ))}
                              </div>
                         </div>
                    </form>
          
                    {/* ── Footer ── */}
                    <div className="ctm__footer">
                         <button className="ctm__btn-cancel" type='button' onClick={onClose}>Annuler</button>
                         <button
                              className="ctm__btn-submit"
                              disabled={!name.trim()}
                              onClick={handleSubmit}
                              // type=''
                         >
                              + Ajouter la tâche
                         </button>
                    </div>
               </div>
          </div>
     )
}
