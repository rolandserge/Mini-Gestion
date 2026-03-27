import { MdSearch, MdKeyboardArrowDown } from 'react-icons/md'
export default function PageHeader({ title, description }) {

     return (
          <header className="page-header">
               <div className="page-header__left">
                    <h1>{title}</h1>
                    {description && <p>{description}</p>}
               </div>
               <div className="page-header__center">
                    <div className="page-header__search">
                         <MdSearch className="search-icon" />
                         <input type="text" placeholder="Rechercher un projet, une tâche…" />
                    </div>
               </div>
               <div className="page-header__right">
                    <div className="page-header__profile">
                         <div className="page-header__avatar">JD</div>
                         <div className="page-header__info">
                              <p className="page-header__name">John Doe</p>
                              <p className="page-header__role">Administrateur</p>
                         </div>
                         <MdKeyboardArrowDown className="page-header__chevron" />
                    </div>
               </div>
          </header>
     )
}
