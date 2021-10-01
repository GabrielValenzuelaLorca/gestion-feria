import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addStory } from '../store/actions/storiesActions';
import { newStory } from '../utils/functions'

const StoryForm = ({isActive, handleClose}) => {  
  const stories = useSelector(state => state.stories);
  const dispatch = useDispatch();
  const formRef = useRef({}); 
  const warningRef = useRef({});

  const save = () => {
    let result = {};
    let validation = true;

    Object.keys(formRef.current).forEach(field => {
      const element = formRef.current[field];
      result[field] = element.value;
      const inputClass = element.classList;
      const warningMessageClass = warningRef.current[field].classList;

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
    Object.keys(formRef.current).forEach(field => {
      formRef.current[field].value = "";
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

        <section className="modal-card-body">
          <div className="field">
            <label className="label">Número Historia</label>
            <div className="control">
              <div className="field has-addons">
                <div className="control">
                  <button className="button is-static">HU</button>
                </div>

                <div className="control">
                  <input ref={el => formRef.current.numero = el} className="input" type="number" placeholder="10" min="0" />
                </div>
              </div>
            </div>
            <p ref={el => warningRef.current.numero = el} className="help is-danger is-hidden">
              Este campo es obligatorio
            </p>
          </div>

          <div className="field">
            <label className="label">Título Historia</label>
            <div className="control">
              <input ref={el => formRef.current.titulo = el} className="input" type="text" placeholder="Creación de usuarios, CRUD perfiles, etc..."/>
            </div>
            <p ref={el => warningRef.current.titulo = el} className="help is-danger is-hidden">
              Este campo es obligatorio
            </p>
          </div>

          <div className="field">
            <label className="label">Descripción Historia</label>
            <div className="control">
              <textarea ref={el => formRef.current.descripcion = el} className="textarea" placeholder="Como <sujeto> quiero <deseo> para <objetivo>..."/>
            </div>
            <p ref={el => warningRef.current.descripcion = el} className="help is-danger is-hidden">
              Este campo es obligatorio
            </p>
          </div>
        </section>

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