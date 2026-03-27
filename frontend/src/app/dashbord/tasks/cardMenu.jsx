import React, { useState, useEffect, useRef } from 'react'
import { MdMoreHoriz, MdEdit, MdDelete, MdSwapHoriz } from 'react-icons/md'
import { statuses } from '../../../constants'

export default function TaskCardMenu({ task, onEdit, onDelete, onStatusChange }) {

     const [open,       setOpen]       = useState(false)
     const [statusOpen, setStatusOpen] = useState(false)
     const menuRef = useRef(null)
     
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
     
     const handleEdit = () => { setOpen(false); onEdit?.(task) }
     const handleDelete = () => { setOpen(false); onDelete?.(task) }
     const handleStatusChange = (key) => { setOpen(false); setStatusOpen(false); onStatusChange?.(task, key) }
     
     return (
          <div className="tcm" ref={menuRef}>
               <button
                    className={`tcm__trigger${open ? ' tcm__trigger--open' : ''}`}
                    onClick={handleToggle}
               >
                    <MdMoreHoriz />
               </button>
          
               {open && (
                    <div className="tcm__dropdown">
                         <div className="tcm__head">
                              <p className="tcm__head-name">{task?.name}</p>
                              <p className="tcm__head-sub">Gérer cette tâche</p>
                         </div>
                         <div className="tcm__section">
                              <span className="tcm__section-label">Actions</span>
                              <button className="tcm__item" onClick={handleEdit}>
                                   <span className="tcm__item-icon tcm__item-icon--edit"><MdEdit /></span>
                                   Modifier
                              </button>
                              <button
                                   className={`tcm__item${statusOpen ? ' tcm__item--active' : ''}`}
                                   onClick={() => setStatusOpen(p => !p)}
                              >
                                   <span className="tcm__item-icon tcm__item-icon--status"><MdSwapHoriz /></span>
                                   Changer le statut
                                   <span className={`tcm__arrow${statusOpen ? ' tcm__arrow--open' : ''}`}>›</span>
                              </button>
          
                              {statusOpen && (
                                   <div className="tcm__status-list">
                                        {statuses.map(s => (
                                             <button
                                                  key={s.key}
                                                  className="tcm__status-item"
                                                  onClick={() => handleStatusChange(s.key)}
                                             >
                                                  <span className="tcm__status-dot" style={{ background: s.color }} />
                                                  <span style={{ color: s.color, fontWeight: 500 }}>{s.label}</span>
                                                  {task?.status === s.key && <span className="tcm__status-check">✓</span>}
                                             </button>
                                        ))}
                                   </div>
                               )}
                         </div>
                         <div className="tcm__divider" />
          
                         <div className="tcm__section">
                              <button className="tcm__item tcm__item--danger" onClick={handleDelete}>
                                   <span className="tcm__item-icon tcm__item-icon--danger"><MdDelete /></span>
                                   Supprimer la tâche
                              </button>
                         </div>
                    </div>
               )}
          </div>
     )
}
