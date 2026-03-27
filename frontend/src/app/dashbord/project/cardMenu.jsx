import React, { useState, useEffect, useRef } from 'react'
import { MdMoreHoriz, MdEdit, MdSwapHoriz, MdDelete, MdOpenInNew } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { statuses } from '../../../constants'


export default function CardMenu({ project, onEdit, onDelete, onStatusChange, onViewDetail,}) {

     const [open, setOpen] = useState(false)
     const [statusOpen, setStatusOpen] = useState(false)
     const menuRef = useRef(null)
     
     // Fermer au clic extérieur
     useEffect(() => {
          const handler = (e) => {
               if (menuRef.current && !menuRef.current.contains(e.target)) {
                    setOpen(false)
                    setStatusOpen(false)
               }
          }
          document.addEventListener('mousedown', handler)
          return () => document.removeEventListener('mousedown', handler)
     }, [])

     const handleToggle = (e) => {
          e.stopPropagation()
          setOpen(prev => !prev)
          setStatusOpen(false)
     }
     
     const handleEdit = () => {
          setOpen(false)
          onEdit?.(project)
     }
     
     const handleDelete = () => {
          setOpen(false)
          onDelete?.(project)
     }
     
     const handleViewDetail = () => {
          setOpen(false)
          onViewDetail?.(project)
     }
     
     const handleStatusChange = (statusKey) => {
          setOpen(false)
          setStatusOpen(false)
          onStatusChange?.(project, statusKey)
     }


     return (
          <div className="pcm" ref={menuRef}>
               <button
                    className={`pcm__trigger${open ? ' pcm__trigger--open' : ''}`}
                    onClick={handleToggle}
               >
                    <MdMoreHoriz />
               </button>
               {open && (
                    <div className="pcm__dropdown">
                         {/* Actions */}
                         <div className="pcm__section">
                              <span className="pcm__section-label">Actions</span>
                              <NavLink className="pcm__item" to={handleViewDetail}>
                                   <span className="pcm__item-icon pcm__item-icon--detail"><MdOpenInNew /></span>
                                   Voir les détails
                              </NavLink>
               
                              <button className="pcm__item" onClick={handleEdit}>
                                   <span className="pcm__item-icon pcm__item-icon--edit"><MdEdit /></span>
                                   Modifier
                              </button>
                              <button
                                   className={`pcm__item${statusOpen ? ' pcm__item--active' : ''}`}
                                   onClick={() => setStatusOpen(prev => !prev)}
                              >
                                   <span className="pcm__item-icon pcm__item-icon--status"><MdSwapHoriz /></span>
                                   Changer le statut
                                   <span className={`pcm__arrow${statusOpen ? ' pcm__arrow--open' : ''}`}>›</span>
                              </button>
               
                              {/* Sous-menu statuts */}
                              {statusOpen && (
                                   <div className="pcm__status-list">
                                        {statuses.map((s) => (
                                        <button
                                             key={s.key}
                                             className="pcm__status-item"
                                             onClick={() => handleStatusChange(s.key)}
                                        >
                                             <span
                                                  className="pcm__status-dot"
                                                  style={{ background: s.color }}
                                             />
                                             <span style={{ color: s.color, fontWeight: 500 }}>{s.label}</span>
                                             {project.status === s.key && (
                                                  <span className="pcm__status-check">✓</span>
                                             )}
                                        </button>
                                        ))}
                                   </div>
                              )}
                         </div>
               
                         <div className="pcm__divider" />
                         {/* Supprimer */}
                         <div className="pcm__section">
                              <button className="pcm__item pcm__item--danger" onClick={handleDelete}>
                                   <span className="pcm__item-icon pcm__item-icon--danger"><MdDelete /></span>
                                   Supprimer le projet
                              </button>
                         </div>
                    </div>
               )}
          </div>
     )
}
