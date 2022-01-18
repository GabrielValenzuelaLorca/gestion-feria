import React from 'react';
import Card from '../components/Dashboard/Card';

const sample = [
  [{
    teamName: "Equipo 1",
    projectName: "Proyecto 1",
    porcentaje: "50"
  },{
    teamName: "Equipo 2",
    projectName: "Proyecto 2",
    porcentaje: "50"
  },{
    teamName: "Equipo 2",
    projectName: "Proyecto 2",
    porcentaje: "50"
  },{
    teamName: "Equipo 2",
    projectName: "Proyecto 2",
    porcentaje: "50"
  }],[{
    teamName: "Equipo 2",
    projectName: "Proyecto 2",
    porcentaje: "50"
  },{
    teamName: "Equipo 2",
    projectName: "Proyecto 2",
    porcentaje: "50"
  }],
]

const DashboardView = () => {
  return (
    <section className='section'>
      {
        sample.map((row) => (
          <div className='columns'>
            {
              row.map(team => (
                <div className='column is-3'>
                  <Card team={team}/>
                </div>
              ))
            }
          </div>
        ))
      }
    </section>
  )
}

export default DashboardView;