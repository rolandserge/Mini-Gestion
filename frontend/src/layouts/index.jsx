import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { mainMenu, generalMenu } from "../constants/index"
import { MdCheckCircleOutline, MdLogout } from 'react-icons/md'

export default function DashbordLayout() {

     return (
          <div className='dashbord-layout'>
               <aside className="sidebar">
                    {/* ── Logo ── */}
                    <div className="sidebar__logo">
                         <div className="logo-icon">
                              <MdCheckCircleOutline />
                         </div>
                         <span className="logo-text">
                              Tâche<span> Pro</span>
                         </span>
                    </div>

                    {/* ── Navigation ── */}
                    <nav className="sidebar__nav">
                         {/* Menu principal */}
                         <div className="sidebar__group">
                              <span className="sidebar__group-label">Menu</span>
                              {mainMenu.map((item) => (
                                   <NavLink
                                        key={item.path}
                                        to={item.path}
                                        end={item.path === '/dashboard'}
                                        className={({ isActive }) => `sidebar__item${isActive ? ' sidebar__item--active' : ''}`}
                                   >
                                        <span className="item-icon">{item.icon}</span>
                                        <span className="item-label">{item.label}</span>
                                   </NavLink>
                              ))}
                         </div>
                         {/* Menu général */}
                         <div className="sidebar__group">
                              <span className="sidebar__group-label">Général</span>
                              { generalMenu.map((item) => (
                                   <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) => `sidebar__item${isActive ? 'sidebar__item--active' : ''}`}
                                   >
                                        <span className="item-icon">{item.icon}</span>
                                        <span className="item-label">{item.label}</span>
                                   </NavLink>
                              ))}
                              {/* Déconnexion */}
                              <button
                                   className="sidebar__item sidebar__item--danger"
                                   onClick={() => console.log('Déconnexion...')}
                              >
                                   <span className="item-icon"><MdLogout /></span>
                                   <span className="item-label">Déconnexion</span>
                              </button>
                              {/* <div className="sidebar__divider" /> */}

                         </div>

                    </nav>
                    {/* ── Footer : carte utilisateur ── */}
                    {/* <div className="sidebar__footer">
                         <div className="user-card">
                              <div className="user-avatar">JD</div>
                              <div className="user-info">
                                   <p className="user-name">John Doe</p>
                                   <p className="user-role">Administrateur</p>
                              </div>
                              <span className="user-more"><MdMoreVert /></span>
                         </div>
                    </div> */}
               </aside>
               <main className="dashbord-layout__main">
                    <Outlet />
               </main>
          </div>
     )
}
