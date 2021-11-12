import React from "react";
import { Checkbox, Input, Select, Textarea } from "../Forms";

const ActivityDetails = ({isActive, closeModal, activity}) => {
  
  return (
    <section className={`modal ${ isActive ? "is-active" : "" }`}>
      <div className="modal-background" onClick={closeModal}/>

      <article className="modal-card">
        <header className="modal-card-head">
          <p className="has-text-weight-bold is-size-4">
            {activity.nombre}
          </p>
        </header>

        <form className="modal-card-body">
          <Input name="nombre"
            label="Titulo Actividad"  
            type="text"
            placeholder="Creación de informes..."
          />

          <Select name="tipo"
            label="Tipo Actividad"
          />

          <Input name="inicio"
            label="Fecha de Inicio"  
            type="date"
          />

          <Input name="termino"
            label="Fecha de Término"  
            type="date"
          />

          <Checkbox name="atraso"
            text="¿Acepta atrasos?"
          />
          
          <Textarea name="descripcion"
            label="Descripción Actividad"
            placeholder="Los alumnos tendrán que crear sus historias de usuario para..."
          />
        </form>

        <footer className="modal-card-foot">
          <button className="button is-success">
            Crear
          </button>

          <button className="button is-danger">
            Cancelar
          </button>
        </footer>
      </article>
    </section>
  )
}

export default ActivityDetails;