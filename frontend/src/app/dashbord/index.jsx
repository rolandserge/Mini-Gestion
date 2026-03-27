import { MdSearch, MdKeyboardArrowDown } from 'react-icons/md'
import { projectsByStatus, recentProjects, statCards, statusMap, tasksByPriority, tasksByStatus } from '../../constants'
import { DonutChart, ProjectsPieChart } from '../../components/dashboard/statsGraphic';
import PageHeader from '../../components/pageHeader';
import StatsCard from '../../components/statsCard';


export default function Dashboard() {

  return (
    <div className="dashboard">
      {/* ── Header ── */}
      <PageHeader title="Tableau de bord" description="Vue d'ensemble de vos projets et tâches" />

      {/* ── Body ── */}
      <div className="dash-body">
        {/* ── Stat Cards ── */}
        <div className="dash-body__stat-group-top">
          <div className="gauche">
            <div className="stat-cards">
              {statCards.map((c) => (
                <StatsCard data={c} />
              ))}
            </div>
            <div className="charts-row">
            {/* Tâches par statut */}
              <div className="chart-card">
                <h2 className="chart-card__title">Tâches par statut</h2>
                <p className="chart-card__subtitle">Répartition en pourcentage</p>
                <div className="progress-list">
                  {tasksByStatus.map((t, i) => (
                    <div className="progress-item" key={i}>
                      <div className="progress-header">
                        <span className="p-label">
                          <span className="dot" style={{ background: t.color }} />
                          {t.label}
                        </span>
                        <span className="p-pct">{t.pct}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${t.pct}%`, background: t.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Tâches par priorité — Donut */}
          <div className="chart-card">
            <h2 className="chart-card__title">Tâches par priorité</h2>
            <p className="chart-card__subtitle">Distribution circulaire</p>
            <DonutChart data={tasksByPriority} />
          </div>
        </div>

        <div className='stat-group-bottom'>
            {/* Projets par statut */}
            <div className="chart-card">
              <h2 className="chart-card__title">Projets par statut</h2>
              <p className="chart-card__subtitle">Avancement global</p>
              <ProjectsPieChart data={projectsByStatus} />
            </div>
            {/* ── Tables ── */}
            {/* <div className="tables-row"> */}
              {/* Projets récents */}
            <div className="table-card">
              <div className="table-card__header">
                <h3>Projets récents</h3>
                <a href="/dashboard/projets" className="see-all">Voir tout →</a>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Projet</th>
                    <th>Statut</th>
                    <th>Progrès</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((p, i) => (
                    <tr key={i}>
                      <td>
                        <p className="cell-name">{p.name}</p>
                        <p className="cell-sub">{p.date}</p>
                      </td>
                      <td>
                        <span className={`status-badge status-badge${statusMap[p.status].cls}`}>
                          {statusMap[p.status].label}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{
                            flex: 1, height: 6, borderRadius: 50, background: '#f3f4f6', overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${p.progress}%`, height: '100%', borderRadius: 50,
                              background: p.progress === 100 ? '#059669' : '#4f46e5'
                            }} />
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#374151', width: 32 }}>
                            {p.progress}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* </div> */}
          </div>
        </div>
    </div>
  )
}
