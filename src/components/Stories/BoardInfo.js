import React, { useState } from "react";
import StoryForm from "./StoryForm";
import { setModalState } from "../../utils/functions";

const BoardInfo = () => {
  const [modalState, setModal] = useState(false);

  return (
    <section className="message is-primary">
      <div className="message-header">Definición de Historias</div>
      <div className="message-body">
        <div className="block">
          <p>
            En esta actividad solo podrán definir historias, además de editarlas
            o eliminarlas. En estas solo podrán manipular el numero de historia,
            el titulo y la descripción.
          </p>
        </div>
        <div className="block">
          <p>Fecha de Cierre: 05/09/2021</p>
        </div>
        <div className="block">
          <p>Tiempo Restante: 5 días</p>
        </div>
        <button
          className="button is-success"
          onClick={() => setModalState(true, setModal)}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>

          <span>Nueva Historia</span>
        </button>
      </div>
      <StoryForm
        isActive={modalState}
        handleClose={() => setModalState(false, setModal)}
      />
    </section>
  );
};

export default BoardInfo;
