import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addStory } from '../store/actions/storiesActions';
import { newStory } from '../utils/functions'

const StoryForm = ({isActive, handleClose}) => {  
  const stories = useSelector(state => state.stories);
  const dispatch = useDispatch();
  const storyForm = useRef(); 
  const fields = ["numero","titulo","descripcion"];

  const save = () => {
    let result = {};
    let validation = true;

    fields.forEach(field => {
      result[field] = storyForm.current.elements[field].value
      const inputClass = storyForm.current.elements[field].classList;
      const warningMessageClass = storyForm.current.querySelector(`.warning-${field}`).classList;

      if(result[field] === ""){
        inputClass.add('is-danger')
        warningMessageClass.remove('is-hidden');     
        validation = false; 
      } else {
        inputClass.remove('is-danger')
        warningMessageClass.add('is-hidden');   
      }
    });

    if (validation){
      const max_index = Math.max(...stories.filter(s => s.estado === 'Backlog').map(s => s.index));
      const max_id = Math.max(...stories.map(s => s.id));
      const new_story = newStory({
        ...result,
        id: max_id + 1,
        index: max_index + 1,
      });

      dispatch(addStory(new_story));

      clearForm();
    } 
  }

  const clearForm = () => {
    fields.forEach((field) => {
      storyForm.current.elements[field].value = "";
    });

    handleClose();
  }

  return (
    <section className={`modal ${ isActive ? "is-active" : "" }`}>
      <div className="modal-background" onClick={handleClose}/>

      <article className="modal-card">
        <header className="modal-card-head">
          <p className="has-text-weight-bold is-size-4">
            Definición de Historias
          </p>
        </header>

        <form className="modal-card-body" ref={storyForm}>
          <div className="field">
            <label className="label">Número Historia</label>
            <div className="control">
              <div className="field has-addons">
                <div className="control">
                  <button className="button is-static">HU</button>
                </div>

                <div className="control">
                  <input className="input" name="numero" type="number" placeholder="10" min="0" />
                </div>
              </div>
            </div>
            <p className="help is-danger is-hidden warning-numero">Este campo es obligatorio</p>
          </div>

          <div className="field">
            <label className="label">Título Historia</label>
            <div className="control">
              <input className="input" name="titulo" type="text" placeholder="Creación de usuarios, CRUD perfiles, etc..."/>
            </div>
            <p className="help is-danger is-hidden warning-titulo">Este campo es obligatorio</p>
          </div>

          <div className="field">
            <label className="label">Descripción Historia</label>
            <div className="control">
              <textarea className="textarea" name="descripcion" placeholder="Como <sujeto> quiero <deseo> para <objetivo>..."/>
            </div>
            <p className="help is-danger is-hidden warning-descripcion">Este campo es obligatorio</p>
          </div>
        </form>

        <footer className="modal-card-foot">
          <button className="button is-success" onClick={save}>
            Crear
          </button>

          <button className="button is-danger" onClick={clearForm}>
            Cancelar
          </button>
        </footer>
      </article>
    </section>
  )
}

export default StoryForm;