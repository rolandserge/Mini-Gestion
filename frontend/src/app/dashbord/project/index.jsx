import React, { useMemo, useState } from 'react'
import PageHeader from '../../../components/pageHeader'
import { allProjects, statCardsProject, statusConfig, tabs } from '../../../constants'
import { MdSearch, MdAdd, MdGridView, MdViewList, MdRestartAlt } from 'react-icons/md'
import ProjectCard from '../../../components/projectCard'
import StatsCard from '../../../components/statsCard'
import CreateProject from './createProject'

export default function Project() {

     const [activeTab, setActiveTab] = useState('all')
     const [activeStatus, setActiveStatus] = useState('all')
     const [viewMode, setViewMode] = useState('grid')
     const [search, setSearch] = useState('')
     const [showModal, setShowModal] = useState(false)

     const filtered = useMemo(() => {

          return allProjects.filter(p => {
               if (activeTab === 'mine' && !p.mine) return false
               if (activeTab === 'progress' && p.status !== 'progress')  return false
               if (activeTab === 'done'     && p.status !== 'done') return false
               if (activeTab === 'archived' && !p.archived) return false
               if (activeStatus   !== 'all' && p.status   !== activeStatus)   return false
               if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
               return true
          })
     }, [activeTab, activeStatus, search])

     const handleReset = () => {
          setActiveStatus('all')
          setSearch('')
     }

     return (
          <>
               <div className="projects-page">
                    {/* ── Header ── */}
                    <PageHeader title="Projets" description="Gérez et suivez tous vos projets"  />

                    <div className="projects-body">
                         {/* ── Stat Cards ── */}
                         <div className="projects-stats">
                              {statCardsProject.map((s) => (
                                   <StatsCard data={s} key={s.label} />
                              ))}
                         </div>
                         {/* ── Nav Bar ── */}
                         <nav className="projects-nav">
                              {tabs.map(tab => (
                                   <button
                                        key={tab.key}
                                        className={`projects-nav__item${activeTab === tab.key ? ' projects-nav__item--active' : ''}`}
                                        onClick={() => setActiveTab(tab.key)}
                                   >
                                        {tab.label}
                                   </button>
                              ))}
                         </nav>
                         {/* ── Projects Card ── */}
                         <div className="projects-card">
                              {/* Ligne 1 : titre + search + créer */}
                              <div className="projects-card__header-top">
                                   <span className="projects-card__title">
                                        {tabs.find(t => t.key === activeTab)?.label}
                                        <span className="projects-card__count">({filtered.length})</span>
                                   </span>
                                   <div className="projects-card__search">
                                        <MdSearch className="search-icon" />
                                        <input
                                             type="text"
                                             placeholder="Rechercher un projet…"
                                             value={search}
                                             onChange={e => setSearch(e.target.value)}
                                        />
                                   </div>
                                   <button className="btn-create" onClick={() => setShowModal(true)}>
                                        <MdAdd /> Créer un projet
                                   </button>
                              </div>
                              {/* Ligne 2 : filtres */}
                              <div className="projects-card__filters">
                                   <span className="filter-label">Statut</span>
                                   <div className="chips-group">
                                        {['all', 'progress', 'done', 'pending', 'cancelled'].map(s => (
                                             <button
                                                  key={s}
                                                  className={`chip chip--status chip--${s}${activeStatus === s ? ' chip--active' : ''}`}
                                                  onClick={() => setActiveStatus(s)}
                                             >
                                                  {s === 'all' ? 'Tous' : statusConfig[s]?.label}
                                             </button>
                                        ))}
                                   </div>
                                   <button className="btn-reset" onClick={handleReset}>
                                        <MdRestartAlt /> Réinitialiser
                                   </button>

                                   <div className="view-toggle">
                                        <button
                                             className={`view-btn${viewMode === 'grid' ? ' view-btn--active' : ''}`}
                                             onClick={() => setViewMode('grid')}
                                             title="Grille"
                                        >
                                             <MdGridView />
                                        </button>
                                        <button
                                             className={`view-btn${viewMode === 'list' ? ' view-btn--active' : ''}`}
                                             onClick={() => setViewMode('list')}
                                             title="Liste"
                                        >
                                             <MdViewList />
                                        </button>
                                   </div>
                              </div>

                              {/* Grille / Liste */}
                              {filtered.length === 0 ? (
                                   <div className="projects-empty">
                                        <span className="projects-empty__icon">📭</span>
                                        <p className="projects-empty__text">Aucun projet trouvé</p>
                                   </div>
                              ) : (
                                   <div className={viewMode === 'grid' ? 'projects-grid' : 'projects-list'}>
                                        {filtered.map(p => (
                                             <ProjectCard key={p.id} project={p} viewMode={viewMode} />
                                        ))}
                                   </div>
                              )}
                         </div>
                    </div>
               </div>
               {showModal && (
                    <CreateProject
                         onClose={() => setShowModal(false)}
                    />
               )}
          </>
     )
}
