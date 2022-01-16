import React from 'react';
import ProjectInfo from '../components/Teams/ProjectInfo';
import TeamInfo from '../components/Teams/TeamInfo';

const TeamView = () => {
  return (
    <div>
      <section>
        <header className= "section pb-0">
          <section className='columns'>
            <TeamInfo/>
            <ProjectInfo/>
          </section>
        </header>
      </section>
    </div>
  )
}

export default TeamView;