import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdArrowBack, MdEdit, MdDelete, MdAdd, MdCheckCircle, MdRadioButtonUnchecked,
} from 'react-icons/md'
import { PROJECT } from '../../../constants'
import CreateTask from '../tasks/createTask'
import TaskCardMenu from '../tasks/cardMenu'


const statusConfig = {
  done:     { label: 'Terminé',    cls: 's-done',     color: '#1D9E75' },
  progress: { label: 'En cours',   cls: 's-progress', color: '#378ADD' },
  pending:  { label: 'En attente', cls: 's-pending',  color: '#EF9F27' },
  cancelled:{ label: 'Annulé',     cls: 's-cancel',   color: '#E24B4A' },
}
 
 
const taskTabs = ['Toutes', 'En cours', 'En attente', 'Terminées']

export default function DetailProject() {

     const navigate   = useNavigate()
     const [activeTab, setActiveTab] = useState('Toutes')
     const [showTaskModal, setShowTaskModal] = useState(false)
     
     const project = PROJECT // → remplacer par fetch API avec useParams()
     
     const total = project.tasks.length
     const done = project.tasks.filter(t => t.status === 'done').length
     const progress = project.tasks.filter(t => t.status === 'progress').length
     const pending = project.tasks.filter(t => t.status === 'pending').length
     const pct = Math.round((done / total) * 100)
     
     const filteredTasks = project.tasks.filter(t => {
          if (activeTab === 'Toutes')    return true
          if (activeTab === 'En cours')  return t.status === 'progress'
          if (activeTab === 'En attente')return t.status === 'pending'
          if (activeTab === 'Terminées') return t.status === 'done'
          return true
     })

     const tabCount = (tab) => {

          if (tab === 'Toutes')    return total
          if (tab === 'En cours')  return progress
          if (tab === 'En attente')return pending
          if (tab === 'Terminées') return done

          return 0
     }

     if(showTaskModal) {
          return (
               <CreateTask
                    onClose={() => setShowTaskModal(false)}
                    onCreate={(data) => console.log('nouvelle tâche', data)}
                    members={project.members}
               />
          )
     }

     return (
          <div className="pd">
               {/* ── Sous-header ── */}
               <div className="pd__subheader">
                    <button className="pd__back" onClick={() => navigate(-1)}>
                         <MdArrowBack /> Retour aux projets
                    </button>
                    <div className="pd__breadcrumb">
                         <span>Projets</span>
                         <span className="pd__breadcrumb-sep">›</span>
                         <strong>{project.name}</strong>
                    </div>
                    <div className="pd__actions">
                         <button className="pd__btn-edit">
                              <MdEdit /> Modifier
                         </button>
                         <button className="pd__btn-delete">
                              <MdDelete /> Supprimer
                         </button>
                    </div>
               </div>
          
               <div className="pd__body">
                    {/* ── Hero ── */}
                    <div className="pd__hero">
                         <div className="pd__hero-bar" style={{ background: project.color }} />
                         <div className="pd__hero-body">
                              <div className="pd__hero-icon" style={{ background: `${project.color}18`, color: project.color }}>
                                   📁
                              </div>
                              <div className="pd__hero-info">
                                   <h2 className="pd__hero-name">{project.name}</h2>
                                   <p className="pd__hero-desc">{project.description}</p>
                                   <div className="pd__hero-badges">
                                        <span className={`status-badge ${statusConfig[project.status].cls}`}>
                                             {statusConfig[project.status].label}
                                        </span>
                                   </div>
                              </div>
                              <div className="pd__hero-meta">
                                   <div className="pd__meta-item">
                                        <strong>{project.createdAt}</strong>
                                        <span>Date de création</span>
                                   </div>
                              </div>
                         </div>
                    </div>
                    {/* ── Stats ── */}
                    <div className="pd__stats">
                         {[ { label: 'Tâches totales', value: total, color: project.color, pct: 100 },
                         { label: 'Terminées', value: done, color: '#1D9E75', pct: (done / total) * 100 },
                         { label: 'En cours', value: progress, color: '#378ADD', pct: (progress / total) * 100 },
                         { label: 'En attente', value: pending, color: '#EF9F27', pct: (pending / total) * 100 },
                         ].map((s, i) => (
                              <div className="pd__stat-card" style={{ background: `${s.color}26` }} key={i}>
                                   <p className="pd__stat-value" style={{ color: s.color }}>{s.value}</p>
                                   <p className="pd__stat-label">{s.label}</p>
                                   <div className="pd__stat-bar">
                                        <div className="pd__stat-fill" style={{ width: `${s.pct}%`, background: s.color }} />
                                   </div>
                              </div>
                         ))}
                    </div>
                    {/* ── Main grid ── */}
                    <div className="pd__grid">
                         {/* Tâches */}
                         <div className="pd__card">
                              <div className="pd__card-header">
                                   <h3 className="pd__card-title">Tâches du projet</h3>
                                   <button className="pd__btn-add" onClick={() => setShowTaskModal(true)}>
                                        <MdAdd /> Ajouter une tâche
                                   </button>
                              </div>
                              {/* Onglets */}
                              <div className="pd__tabs">
                                   {taskTabs.map(tab => (
                                        <button
                                             key={tab}
                                             className={`pd__tab${activeTab === tab ? ' pd__tab--active' : ''}`}
                                             onClick={() => setActiveTab(tab)}
                                        >
                                             {tab} <span className="pd__tab-count">({tabCount(tab)})</span>
                                        </button>
                                   ))}
                              </div>
                              {/* Liste */}
                              <div className="pd__task-list">
                                   {filteredTasks.map(task => (
                                        <div className="pd__task" key={task.id}>
                                             <div className={`pd__task-check${task.status === 'done' ? ' pd__task-check--done' : ''}`}>
                                                  {task.status === 'done' ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}
                                             </div>
                                             <span className={`pd__task-name${task.status === 'done' ? ' pd__task-name--done' : ''}`}>
                                                  {task.name}
                                             </span>
                                             <span className={`pd__task-priority tp-${task.priority}`}>
                                                  {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                                             </span>
                                             <div
                                                  className="pd__task-avatar"
                                                  style={{ background: task.assignee.color }}
                                                  title={task.assignee.initials}
                                             >
                                                  {task.assignee.initials}
                                             </div>
                                             <span className="pd__task-date">{task.date}</span>
                                             <TaskCardMenu
                                                  task={task}
                                                  onEdit={(t) => console.log('modifier', t)}
                                                  onStatusChange={(t, status) => console.log('statut', t.id, status)}
                                                  onDelete={(t) => console.log('supprimer', t)}
                                             />
                                        </div>
                                   ))}
                              </div>
                         </div>
                         {/* Sidebar */}
                         <div className="pd__sidebar">
                              {/* Progression */}
                              <div className="pd__prog-card">
                                   <h3 className="pd__prog-title">Progression globale</h3>
                                   <div className="pd__prog-big">
                                        <span className="pd__prog-pct">{pct}%</span>
                                        <span className="pd__prog-sub">complété</span>
                                   </div>
                                   <p className="pd__prog-tasks-lbl">{done} / {total} tâches effectuées</p>
                                   <div className="pd__prog-track">
                                        <div className="pd__prog-fill" style={{ width: `${pct}%`, background: project.color }} />
                                   </div>
                                   <div className="pd__status-breakdown">
                                        {[{ label: 'Terminées',  count: done,     color: '#1D9E75' },
                                        { label: 'En cours',   count: progress, color: '#378ADD' },
                                        { label: 'En attente', count: pending,  color: '#EF9F27' },
                                        ].map((s, i) => (
                                             <div className="pd__breakdown-row" key={i}>
                                                  <span className="pd__breakdown-dot" style={{ background: s.color }} />
                                                  <span className="pd__breakdown-label">{s.label}</span>
                                                  <span className="pd__breakdown-count">{s.count}</span>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                              {/* Membres */}
                              <div className="pd__members-card">
                                   <h3 className="pd__members-title">Membres assignés</h3>
                                   <div className="pd__members-list">
                                        {project.members.map((m, i) => (
                                             <div className="pd__member" key={i}>
                                                  <div className="pd__member-avatar" style={{ background: m.color }}>
                                                       {m.initials}
                                                  </div>
                                                  <div className="pd__member-info">
                                                       <p className="pd__member-name">{m.name}</p>
                                                       <p className="pd__member-role">{m.role}</p>
                                                  </div>
                                                  <span className={`pd__member-badge pd__member-badge--${m.badgeCls}`}>
                                                       {m.badge}
                                                  </span>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}
