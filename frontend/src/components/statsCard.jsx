import React from 'react'

export default function StatsCard({ data }) {

     return (
          <div className={`stat-card stat-card${data.variant}`} key={data.id}>
               <div className="stat-card__info">
                    <p className="label">{data.label}</p>
                    <div className="stat-card__icon">{data.icon}</div>
               </div>
               <p className="value">{data.value}</p>
          </div>
     )
}
