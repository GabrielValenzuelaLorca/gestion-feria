import React from 'react';

const Card = ({ team }) => {
  return (
    <div class="card">
      <div class="card-image">
        <figure class="image">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="team_logo"/>
        </figure>
      </div>
      <div class="card-content">
        <p class="title">
          {team.projectName}
        </p>
        <p class="subtitle">
          {team.teamName}
        </p>
        <p>
          Progreso total: ({team.porcentaje}%)
          <progress className='progress is-link' value={team.porcentaje} max='100'></progress>
        </p>
        <p>
          Sprint 1:
          <progress className='progress is-info' value={90} max='100'></progress>
        </p>
        <p>
          Sprint 2:
          <progress className='progress is-link' value={10} max='100'></progress>
        </p>
      </div>
    </div>
  )
}

export default Card;