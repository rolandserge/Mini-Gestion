import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { BsFolderFill } from 'react-icons/bs'
import { HiLightningBolt } from "react-icons/hi";
import { FaHourglassHalf } from "react-icons/fa";

// ── Palette de couleurs ────────────────────────────────────
const palette = [
     { name: 'Indigo',  hex: '#534AB7' },
     { name: 'Violet',  hex: '#7c3aed' },
     { name: 'Bleu',    hex: '#378ADD' },
     { name: 'Cyan',    hex: '#0891b2' },
     { name: 'Vert',    hex: '#1D9E75' },
     { name: 'Lime',    hex: '#65a30d' },
     { name: 'Amber',   hex: '#EF9F27' },
     { name: 'Rouge',   hex: '#E24B4A' },
     { name: 'Rose',    hex: '#be185d' },
     { name: 'Ardoise', hex: '#475569' },
]
 
const statuses = [
     { key: 'pending', label: 'En attente', icon: <HiLightningBolt />  },
     { key: 'progress', label: 'En cours', icon: <FaHourglassHalf /> },
]
 
// ── Helper hex → rgb ───────────────────────────────────────
function hexToRgb(hex) {

     const r = parseInt(hex.slice(1, 3), 16)
     const g = parseInt(hex.slice(3, 5), 16)
     const b = parseInt(hex.slice(5, 7), 16)

     return `${r},${g},${b}`
}
export default function CreateProject({ onClose, onCreate }) {

     const [name, setName] = useState('')
     const [description, setDescription] = useState('')
     const [color, setColor] = useState(palette[0])
     const [status, setStatus] = useState('pending')
     
     const accentSoft = `rgba(${hexToRgb(color.hex)}, 0.12)`
     
     const handleSubmit = () => {

          if (!name.trim()) return

          onCreate?.({ name, description, color: color.hex, status })
          onClose?.()
     }
     
     return (
          <form className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
               <div className="cpm">
                    {/* ── Header ── */}
                    <div className="cpm__header">
                         <div
                              className="cpm__header-bg"
                              style={{ background: color.hex }}
                         />
                         <div
                              className="cpm__header-accent"
                              style={{ background: color.hex }}
                         />
                         <div className="cpm__header-content">
                              <div
                                   className="cpm__icon"
                                   style={{ background: accentSoft, color: color.hex }}
                              >
                                   <BsFolderFill />
                              </div>
                              <div className="cpm__header-text">
                                   <h2 className="cpm__title">Créer un projet</h2>
                                   <p className="cpm__subtitle">Remplissez les informations pour démarrer</p>
                              </div>
                              <button className="cpm__close" onClick={onClose}>
                                   <MdClose />
                              </button>
                         </div>
                    </div>
                    {/* ── Body ── */}
                    <div className="cpm__body">
                         {/* Nom */}
                         <div className="cpm__field">
                              <label className="cpm__label">
                                   Nom du projet <span className="cpm__required">*</span>
                              </label>
                              <input
                                   className="cpm__input"
                                   type="text"
                                   placeholder="Ex : Refonte site web…"
                                   value={name}
                                   onChange={e => setName(e.target.value)}
                                   style={{ '--accent': color.hex, '--accent-soft': accentSoft }}
                                   autoFocus
                              />
                         </div>
                         {/* Couleur */}
                         <div className="cpm__field">
                              <label className="cpm__label">Couleur</label>
                              <div className="cpm__color-swatches">
                                   {palette.map((c) => (
                                        <button
                                             key={c.hex}
                                             type='button'
                                             className={`cpm__swatch${color.hex === c.hex ? ' cpm__swatch--active' : ''}`}
                                             style={{
                                                  background: c.hex,
                                                  outlineColor: color.hex === c.hex ? c.hex : 'transparent',
                                             }}
                                             onClick={() => setColor(c)}
                                             title={c.name}
                                        >
                                             {color.hex === c.hex && '✓'}
                                        </button>
                                   ))}
                              </div>
                              <div className="cpm__color-info">
                                   <span className="cpm__color-dot" style={{ background: color.hex }} />
                                   <span className="cpm__color-name">{color.name}</span>
                                   <span className="cpm__color-hex">{color.hex.toUpperCase()}</span>
                              </div>
                         </div>
                         {/* Statut */}
                         <div className="cpm__field">
                              <label className="cpm__label">Statut</label>
                              <div className="cpm__priority-row">
                                   {statuses.map((s) => (
                                        <button
                                             key={s.key}
                                             className={`cpm__prio cpm__prio--${s.key}${status === s.key ? ' cpm__prio--active' : ''}`}
                                             onClick={() => setStatus(s.key)}
                                             type='button'
                                        >
                                             <span className="cpm__prio-icon">{s.icon}</span>
                                             {s.label}
                                        </button>
                                   ))}
                              </div>
                         </div>
                         {/* Description */}
                         <div className="cpm__field">
                              <label className="cpm__label">Description</label>
                              <textarea
                                   className="cpm__input cpm__input--textarea"
                                   placeholder="Décrivez les objectifs du projet…"
                                   maxLength={300}
                                   value={description}
                                   onChange={e => setDescription(e.target.value)}
                                   style={{ '--accent': color.hex, '--accent-soft': accentSoft }}
                              />
                              <p className="cpm__char-count">{description.length} / 300</p>
                         </div>
                    </div>
                    {/* ── Footer ── */}
                    <div className="cpm__footer">
                         <button className="cpm__btn-cancel" type='button' onClick={onClose}>
                              Annuler
                         </button>
                         <button
                              className="cpm__btn-submit"
                              disabled={!name.trim()}
                              onClick={handleSubmit}
                              style={{ background: color.hex, '--accent-soft': accentSoft }}
                         >
                              + Créer le projet
                         </button>
                    </div>
               </div>
          </form>
     )
}
