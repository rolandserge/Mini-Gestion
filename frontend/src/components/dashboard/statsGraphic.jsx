import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function DonutChart({ data }) {

     const total = data.reduce((s, d) => s + d.count, 0)

     const chartData = {
          labels: data.map(d => d.label),
          datasets: [{
               data: data.map(d => d.count),
               backgroundColor: data.map(d => d.color),
               borderWidth: 0,
               hoverOffset: 6,
          }]
     }

     const options = {
          cutout: '65%',
          plugins: {
               legend: { display: false },
               tooltip: {
                    callbacks: {
                         label: (ctx) => ` ${ctx.raw} tâches — ${Math.round(ctx.raw / total * 100)}%`
                    },
                    backgroundColor: '#fff',
                    titleColor: '#111',
                    bodyColor: '#555',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 8,
               }
          },
          animation: { animateRotate: true, duration: 700 },
     }

     return (
          <div className="donut-wrap">
               <div className="donut-svg-wrap">
                    <Doughnut data={chartData} options={options} />
                    <div className="donut-center">
                         <span className="total-num">{total}</span>
                         <span className="total-lbl">tâches</span>
                    </div>
               </div>
               <div className="donut-legend">
                    {data.map((d, i) => (
                         <div className="legend-item" key={i}>
                         <span className="legend-dot" style={{ background: d.color }} />
                         {d.label}
                         <span className="legend-val">{d.count}</span>
                         </div>
                    ))}
               </div>
          </div>
     )
}

export function ProjectsPieChart({ data }) {

     const total = data.reduce((s, d) => s + d.count, 0)

     const chartData = {
          labels: data.map(d => d.label),
          datasets: [{
               data: data.map(d => d.count),
               backgroundColor: data.map(d => d.color),
               borderWidth: 2,
               borderColor: '#fff',
               hoverOffset: 8,
          }]
     }

     const options = {
          plugins: {
               legend: { display: false },
               tooltip: {
                    callbacks: {
                         label: (ctx) => ` ${ctx.raw} projets — ${Math.round(ctx.raw / total * 100)}%`
                    },
                    backgroundColor: '#fff',
                    titleColor: '#111',
                    bodyColor: '#555',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 8,
               }
          },
          animation: { animateRotate: true, duration: 700 },
     }

     return (
          <div className="hbar-list">
               <div className="pie-chart">
                    <Pie data={chartData} options={options} />
               </div>

               <div className="donut-legend">
                    {data.map((d, i) => (
                         <div
                              key={i}
                              className="legend-item"
                              style={{ opacity: 1 }}
                         >
                              <span className="legend-dot" style={{ background: d.color }} />
                              <span className="legend-label">{d.label}</span>
                              <span className="legend-val">{d.count} projets</span>
                              <span className="legend-pct">{Math.round(d.count / total * 100)}%</span>
                         </div>
                    ))}
               </div>
          </div>
  )
}    