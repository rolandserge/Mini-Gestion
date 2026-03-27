import { useState, useRef, useEffect } from 'react'
import { MdSwapHoriz, MdKeyboardArrowDown  } from 'react-icons/md'

const statuses = [
  { key: 'pending',   label: 'En attente', cls: 's-pending',  color: '#854F0B' },
  { key: 'progress',  label: 'En cours',   cls: 's-progress', color: '#185FA5' },
  { key: 'done',      label: 'Terminé',    cls: 's-done',     color: '#3B6D11' },
  { key: 'cancelled', label: 'Annulé',     cls: 's-cancel',   color: '#A32D2D' },
]

export default function ChangeStatus({ value, onChange }) {

     const [open, setOpen] = useState(false)
     const ref = useRef(null)
     const current = statuses.find(s => s.key === value)

     useEffect(() => {
          const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
          document.addEventListener('mousedown', handler)
          return () => document.removeEventListener('mousedown', handler)
     }, [])

     return (
          <div className="status-select" ref={ref}>
               <button
                    className={`status-badge ${current.cls}${open ? ' open' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setOpen(p => !p) }}
               >
                    {current.label}
                    <MdKeyboardArrowDown className="arrow" />
               </button>

               {open && (
                    <div className="status-popover open">
                         <div className='status-popover__top'>
                              <span className="status-popover__icon status-popover__icon--status"><MdSwapHoriz /></span>
                              <span className="pop-label">Changer le statut</span>
                         </div>
                         {statuses.map(s => (
                              <button key={s.key} className="pop-item" onClick={() => { onChange(s.key); setOpen(false) }}>
                                   <span className="pop-dot" style={{ background: s.color }} />
                                   <span style={{ color: s.color }}>{s.label}</span>
                                   {value === s.key && <span className="pop-check">✓</span>}
                              </button>
                         ))}
                    </div>
               )}
          </div>
     )
}