import { useState, useCallback, useMemo } from 'react';

export const useDashboard = () => {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: "Intégration API paiement", 
      desc: "Connecter Stripe à l'interface", 
      status: "inprogress", 
      priority: "haute", 
      assignee: "SL", 
      done: false 
    },
    { 
      id: 2, 
      title: "Refactoring module auth", 
      desc: "Améliorer la sécurité JWT", 
      status: "todo", 
      priority: "haute", 
      assignee: "MD", 
      done: false 
    },
    { 
      id: 3, 
      title: "Design UI Dashboard v2", 
      desc: "Revoir la palette de couleurs", 
      status: "done", 
      priority: "moyenne", 
      assignee: "AM", 
      done: true 
    },
    { 
      id: 4, 
      title: "Tests unitaires backend", 
      desc: "Coverage à 90%", 
      status: "todo", 
      priority: "moyenne", 
      assignee: "JR", 
      done: false 
    },
    { 
      id: 5, 
      title: "Migration base de données", 
      desc: "PostgreSQL → v15", 
      status: "inprogress", 
      priority: "haute", 
      assignee: "TK", 
      done: false 
    },
    { 
      id: 6, 
      title: "Documentation API REST", 
      desc: "OpenAPI 3.0 complet", 
      status: "todo", 
      priority: "basse", 
      assignee: "SL", 
      done: false 
    },
    { 
      id: 7, 
      title: "CI/CD Pipeline Setup", 
      desc: "GitHub Actions + Docker", 
      status: "inprogress", 
      priority: "haute", 
      assignee: "MD", 
      done: false 
    },
    { 
      id: 8, 
      title: "Optimisation requêtes SQL", 
      desc: "Réduire latence de 40%", 
      status: "done", 
      priority: "moyenne", 
      assignee: "AM", 
      done: true 
    },
  ]);

  const [nextId, setNextId] = useState(9);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = useMemo(() => [
    {
      name: "Projet Alpha",
      progress: 72,
      color: "var(--accent-cyan)",
      gradient: "linear-gradient(90deg,var(--accent-cyan),var(--accent-purple))"
    },
    {
      name: "Projet Beta",
      progress: 45,
      color: "var(--accent-pink)",
      gradient: "linear-gradient(90deg,var(--accent-pink),var(--accent-orange))"
    },
    {
      name: "Projet Gamma",
      progress: 88,
      color: "var(--accent-green)",
      gradient: "linear-gradient(90deg,var(--accent-green),var(--accent-cyan))"
    },
    {
      name: "Design System",
      progress: 30,
      color: "var(--accent-yellow)",
      gradient: "linear-gradient(90deg,var(--accent-yellow),var(--accent-orange))"
    }
  ], []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'done').length;
    const inProgress = tasks.filter(t => t.status === 'inprogress').length;
    const late = tasks.filter(t => t.status === 'todo' && t.priority === 'haute').length;

    return { total, done, inProgress, late };
  }, [tasks]);

  const toggleDone = useCallback((taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newDone = !task.done;
          return {
            ...task,
            done: newDone,
            status: newDone ? 'done' : 'todo'
          };
        }
        return task;
      })
    );
  }, []);

  const changeStatus = useCallback((taskId, newStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus, done: newStatus === 'done' }
          : task
      )
    );
  }, []);

  const addTask = useCallback((newTaskData) => {
    const newTask = {
      id: nextId,
      ...newTaskData,
      status: 'todo',
      done: false
    };
    
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setNextId(prev => prev + 1);
  }, [nextId]);

  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleNavClick = useCallback((nav) => {
    setActiveNav(nav);
  }, []);

  return {
    // State
    tasks,
    activeNav,
    searchTerm,
    filters,
    isModalOpen,
    projects,
    stats,
    
    // Actions
    toggleDone,
    changeStatus,
    addTask,
    handleFilterChange,
    openModal,
    closeModal,
    handleNavClick,
    setSearchTerm
  };
};
