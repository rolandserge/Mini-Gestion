import {
  MdDashboard,
  MdFolderOpen,
  MdPeople,
  MdSettings,
  MdHelpOutline,
  MdCheckCircle
} from 'react-icons/md'
import { BsFolderFill, BsListTask, BsLightningFill, BsCheckCircleFill, BsPauseFill } from 'react-icons/bs'


export const statuses = [
     { key: 'pending',   label: 'En attente', color: '#854F0B' },
     { key: 'progress',  label: 'En cours',   color: '#185FA5' },
     { key: 'done',      label: 'Terminé',    color: '#3B6D11' },
     { key: 'cancelled', label: 'Annulé',     color: '#A32D2D' },
]

export const mainMenu = [
     { 
          label: 'Tableau de bord',
          icon: <MdDashboard />,
          path: '/dashbord' 
     },
     { 
          label: 'Projets', 
          icon: <MdFolderOpen />,
          path: '/dashbord/projets'
     },
     { 
          label: 'Tâches', 
          icon: <BsListTask />,
          path: '/dashbord/taches'
     },
     { 
          label: 'Utilisateurs',
          icon: <MdPeople />,
          path: '/dashbord/utilisateurs'
     },
]

export const generalMenu = [
     { 
          label: 'Paramètres', 
          icon: <MdSettings />, 
          path: '/dashboard/parametres' 
     },
     { 
          label: 'Aide & Support', 
          icon: <MdHelpOutline />, 
          path: '/dashboard/aide' 
     }
]

// ── Données fictives ───────────────────────────────────────
export const statCards = [
     {
          id: 'projects',
          label: 'Projets',
          value: 24,
          icon: <MdFolderOpen />,
          variant: '--projects',
     },
     {
          id: 'tasks',
          label: 'Tâches',
          value: 138,
          icon: <MdCheckCircle />,
          variant: '--tasks',
     },
     {
          id: 'users',
          label: 'Utilisateurs',
          value: 18,
          icon: <MdPeople />,
          variant: "--users"
     },
]

export const tasksByStatus = [
     { label: 'Terminées', pct: 63, color: '#059669' },
     { label: 'En cours', pct: 22, color: '#0284c7' },
     { label: 'A faire', pct: 10, color: '#d97706' },
]

export const tasksByPriority = [
     { label: 'Haute',   count: 42, color: '#d97706' },
     { label: 'Moyenne', count: 65, color: '#1B58A1' },
     { label: 'Basse',   count: 31, color: '#f1f1f1' },
]

export const projectsByStatus = [
     { label: 'Terminés',  count: 9,  color: '#059669', total: 24 },
     { label: 'En cours',  count: 11, color: '#4f46e5', total: 24 },
     { label: 'A faire',  count: 3,  color: '#d97706', total: 24 },
]

export const recentProjects = [
     { name: 'App Mobile RH',      date: '12 mar 2025', status: 'progress',  progress: 68 },
     { name: 'Refonte Site Web',   date: '05 mar 2025', status: 'done',      progress: 100 },
     { name: 'API Paiement',       date: '28 fév 2025', status: 'pending',   progress: 30 },
     { name: 'Dashboard Analytics',date: '20 fév 2025', status: 'progress',  progress: 55 },
     { name: 'Migration BDD',      date: '10 fév 2025', status: 'cancelled', progress: 0 },
]


// ── StatusBadge ───────────────────────────────────────────
export const statusMap = {
     done:      { label: 'Terminé',      cls: '--done' },
     progress:  { label: 'En cours',     cls: '--progress' },
     pending:   { label: 'A faire',   cls: '--pending' },
     cancelled: { label: 'Annulé',       cls: '--cancelled' },
}

export const priorityMap = {
     high:   { label: 'Haute',   cls: '--high' },
     medium: { label: 'Moyenne', cls: '--medium' },
     low:    { label: 'Basse',   cls: '--low' },
}

export const allProjects = [
     { 
          id: 1,
          name: 'App Mobile RH',
          desc: 'Application mobile de gestion RH',
          status: 'progress',
          priority: 'high',
          progress: 68,
          tasks: { 
               done: 34,
               total: 5
          },
          assignees: ['JD','AM','KL'],
          extra: 2,
          date: '12 jan 2025',
          mine: true,
          archived: false
     },
     {
          id: 2,
          name: 'Refonte Site Web',
          desc: 'Redesign complet du site vitrine',
          status: 'done',
          priority: 'medium',
          progress: 100,
          tasks: { 
               done: 28,
               total: 28
          },
          assignees: ['SR','PK'],
          extra: 0,
          date: '05 fév 2025',
          mine: false,
          archived: false
     },
     {
          id: 3,
          name: 'API Paiement',
          desc: 'Intégration passerelle de paiement Stripe',  
          status: 'pending',
          priority: 'high',
          progress: 30,
          tasks: {
               done: 9,
               total: 30
          }, 
          assignees: ['JD','TM','NB'],
          extra: 0,
          date: '28 fév 2025',
          mine: true,
          archived: false
     },
     {
          id: 4,
          name: 'Dashboard Analytics',   
          desc: 'Tableau de bord analytics temps réel',       
          status: 'progress',
          priority: 'medium',
          progress: 55,
          tasks: {
               done: 22,
               total: 40
          },
          assignees: ['JD','LR'],
          extra: 1,
          date: '20 fév 2025',
          mine: true,
          archived: false
     },
     {
          id: 5,
          name: 'Migration BDD',
          desc: 'Migration PostgreSQL vers CockroachDB',
          status: 'cancelled',
          priority: 'low',
          progress: 0,
          tasks: {
               done: 0,
               total: 20
          },
          assignees: ['MK'],
          extra: 0,
          date: '10 fév 2025',
          mine: false,
          archived: false
     },
     {
          id: 6,
          name: 'Module Reporting',
          desc: 'Génération automatique de rapports PDF',
          status: 'done',
          priority: 'low',
          progress: 100,
          tasks: {
               done: 15,
               total: 15
          },
          assignees: ['JD','SR','PK'],
          extra: 0,
          date: '01 jan 2025',
          mine: false,
          archived: true
     },
     {
          id: 7,
          name: 'Notifications Push',
          desc: 'Système de notifications en temps réel',
          status: 'progress',
          priority: 'medium',
          progress: 42,
          tasks: { 
               done: 17,
               total: 40
          },
          assignees: ['AM','JD'],
          extra: 0,
          date: '15 mar 2025',
          mine: true,
          archived: false
     },
     {
          id: 8,
          name: 'Auth SSO',
          desc: 'Single Sign-On avec OAuth2 & SAML',
          status: 'pending',
          priority: 'high',
          progress: 15,
          tasks: {
               done: 3,
               total: 20
          },
          assignees: ['TM','NB','KL'],
          extra: 1,
          date: '18 mar 2025',
          mine: false,
          archived: false
     },
     {
          id: 9,
          name: 'Landing Page v2',
          desc: 'Nouvelle landing page marketing',
          status: 'done',      
          priority: 'low',    
          progress: 100,
          tasks: { 
               done: 12,
               total: 12
          },
          assignees: ['SR'],
          extra: 0,
          date: '22 déc 2024',
          mine: false,
          archived: true
     },
]

export const avatarColors = ['#534AB7', '#1D9E75', '#378ADD', '#E24B4A', '#EF9F27', '#A32D2D', '#a21caf']

export const statusConfig = {
  progress:  { label: 'En cours',   cls: 's-progress', barColor: '#378ADD' },
  done:      { label: 'Terminé',    cls: 's-done',     barColor: '#1D9E75' },
  pending:   { label: 'En attente', cls: 's-pending',  barColor: '#EF9F27' },
  cancelled: { label: 'Annulé',     cls: 's-cancel',   barColor: '#9ca3af' },
  archived:  { label: 'Archivé',    cls: 's-archive',  barColor: '#9ca3af' },
}


export const tabs = [
  { key: 'all',      label: 'Tous les projets' },
  { key: 'mine',     label: 'Mes projets'      },
  { key: 'progress', label: 'En cours'         },
  { key: 'done',     label: 'Terminés'         },
  { key: 'archived', label: 'Archivés'         },
]

export const statCardsProject = [
     {
          label: 'Total',
          icon: <BsFolderFill />,
          variant: '--projects-total',
          value: 87
     },
     {
          label: 'En cours',
          icon: <BsLightningFill />,
          variant: '--projects-progress',
          value: 51
     },
     {
          label: 'Terminés',
          icon: <BsCheckCircleFill />,
          variant: '--projects-done',
          value: 42
     },
     {
          label: 'En pause',
          icon: <BsPauseFill />,
          variant: '--projects-pending',
          value: 66
     },
]


export const PROJECT = {
  id: 1,
  name: 'App Mobile RH',
  description: "Application mobile de gestion des ressources humaines. Permet aux employés de consulter leurs fiches de paie, congés et évaluations depuis leur téléphone.",
  status: 'progress',
  priority: 'high',
  color: '#534AB7',
  createdAt: '12 jan 2025',
  deadline: '30 juin 2025',
  tasks: [
    { id: 1,  name: 'Créer les maquettes UX',           status: 'done',     priority: 'high',   assignee: { initials: 'JD', color: '#534AB7' }, date: '10 jan' },
    { id: 2,  name: 'Setup projet React Native',         status: 'done',     priority: 'medium', assignee: { initials: 'AM', color: '#1D9E75' }, date: '12 jan' },
    { id: 3,  name: 'Intégration API authentification',  status: 'progress', priority: 'high',   assignee: { initials: 'KL', color: '#378ADD' }, date: '20 jan' },
    { id: 4,  name: 'Module gestion des congés',         status: 'progress', priority: 'medium', assignee: { initials: 'JD', color: '#534AB7' }, date: '28 jan' },
    { id: 5,  name: 'Tests unitaires composants UI',     status: 'pending',  priority: 'low',    assignee: { initials: 'SR', color: '#E24B4A' }, date: '05 fév' },
    { id: 6,  name: 'Configuration CI/CD',               status: 'done',     priority: 'high',   assignee: { initials: 'AM', color: '#1D9E75' }, date: '15 jan' },
    { id: 7,  name: 'Écran tableau de bord employé',     status: 'progress', priority: 'medium', assignee: { initials: 'KL', color: '#378ADD' }, date: '12 fév' },
    { id: 8,  name: 'Module fiches de paie',             status: 'pending',  priority: 'high',   assignee: { initials: 'JD', color: '#534AB7' }, date: '18 fév' },
  ],
  members: [
    { id: 1, initials: 'JD', name: 'John Doe',       role: 'Chef de projet',  color: '#534AB7', badge: 'Lead',   badgeCls: 'lead'   },
    { id: 2, initials: 'AM', name: 'Alice Martin',   role: 'Dev Backend',     color: '#1D9E75', badge: 'Dev',    badgeCls: 'dev'    },
    { id: 3, initials: 'KL', name: 'Kevin Leblanc',  role: 'Dev Frontend',    color: '#378ADD', badge: 'Dev',    badgeCls: 'dev'    },
    { id: 4, initials: 'SR', name: 'Sophie Richard', role: 'Designer UI',     color: '#E24B4A', badge: 'Design', badgeCls: 'design' },
  ],
}