import React from 'react';
import { useAuth } from '../../store/authStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Components
import Sidebar from '../../components/dashboard/Sidebar';
import Topbar from '../../components/dashboard/Topbar';
import { StatsGrid } from '../../components/dashboard/StatsGrid';
import { TaskList } from '../../components/dashboard/TaskList';
import { SidePanel } from '../../components/dashboard/SidePanel';
import { BottomGrid } from '../../components/dashboard/BottomGrid';
import TaskModal from '../../components/dashboard/TaskModal';

// Hook
import { useDashboard } from '../../hooks/useDashboard';

// Styles
import '../../styles/dashboard.css';

const Dashboard = () => {
  const { logoutAction, user } = useAuth();
  const navigate = useNavigate();
  
  const {
    tasks,
    activeNav,
    searchTerm,
    filters,
    isModalOpen,
    projects,
    stats,
    toggleDone,
    changeStatus,
    addTask,
    handleFilterChange,
    openModal,
    closeModal,
    handleNavClick,
    setSearchTerm
  } = useDashboard();

  const handleLogout = async () => {
    try {
      await logoutAction();
      toast.success("Déconnexion réussie !");
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <Sidebar 
        user={user}
        activeNav={activeNav}
        onNavClick={handleNavClick}
      />

      {/* MAIN */}
      <div className="main">
        {/* TOPBAR */}
        <Topbar 
          onNewTask={openModal}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* CONTENT */}
        <div className="content">
          {/* STAT CARDS */}
          <StatsGrid stats={stats} />

          {/* MAIN GRID */}
          <div className="main-grid">
            {/* TASK LIST */}
            <TaskList 
              tasks={tasks}
              onToggleDone={toggleDone}
              onStatusChange={changeStatus}
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            {/* SIDE COL */}
            <SidePanel projects={projects} />
          </div>

          {/* BOTTOM GRID */}
          <BottomGrid />
        </div>
      </div>

      {/* MODAL */}
      <TaskModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddTask={addTask}
      />
    </div>
  );
};

export default Dashboard;
