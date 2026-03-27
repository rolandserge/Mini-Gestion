import React from 'react'
import { avatarColors, statusConfig } from '../constants'
import { MdMoreHoriz } from 'react-icons/md'
import CardMenu from '../app/dashbord/project/cardMenu'
import { useNavigate } from "react-router-dom"
import ChangeStatus from '../app/dashbord/project/changeStatus'

export default function ProjectCard({ project, viewMode }) {

     const status = statusConfig[project.status] || statusConfig.pending

     const navigate = useNavigate()

     return (
          <div className={`pj-card${viewMode === 'list' ? ' pj-card--list' : ''}`}>
               <div className="pj-card__top">
                    <div className="pj-card__top-row">
                         <div>
                              <p className="pj-card__name">{project.name}</p>
                         </div>
                         <CardMenu
                              project={project}
                              onViewDetail={(p) => navigate(`/dashboard/projets/${p.id}`)}
                              // onEdit={(p) => onEdit?.(p)}
                              // onStatusChange={(p, status) => onStatusChange?.(p, status)}
                              // onDelete={(p) => onDelete?.(p)}
                         />
                    </div>
                    <div className="pj-card__badges">
                         <ChangeStatus value={project.status} />
                         <span className={`status-badge ${status.cls}`}>{status.label}</span>
                    </div>
               </div>

               <div className="pj-card__progress">
                    <div className="pj-card__progress-row">
                         <span className="pj-card__progress-lbl">Progression</span>
                         <span className="pj-card__progress-pct">{project.progress}%</span>
                    </div>
                    <div className="pj-card__progress-track">
                         <div
                              className="pj-card__progress-fill"
                              style={{ width: `${project.progress}%`, background: status.barColor }}
                         />
                    </div>
                    <p className="pj-card__tasks">
                         <span>{project.tasks.done}</span> / {project.tasks.total} tâches effectuées
                    </p>

                    <div className="pj-card__footer">
                         <div className="pj-card__avatars">
                              {project.assignees.map((a, i) => (
                                   <div key={i} className="pj-card__avatar" style={{ background: avatarColors[i % avatarColors.length] }}>
                                        {a}
                                   </div>
                              ))}
                              {project.extra > 0 && (
                                   <div className="pj-card__avatar pj-card__avatar--more">
                                        +{project.extra}
                                   </div>
                              )}
                         </div>
                         <span className="pj-card__date">Crée le {project.date}</span>
                    </div>
               </div>
          </div>
     )
}
