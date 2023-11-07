import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { criticidadStyle } from "../../utils/classStyles";
import { setModalState } from "../../utils/functions";
import StoryDetails from "./StoryDetails";

const CardDraggable = ({ item }) => {
  const [modalState, setModal] = useState(false);

  return (
    <>
      <Draggable draggableId={item.id} index={item.index}>
        {(provided, snapshot) => (
          <article
            className={`card block has-background-${
              snapshot.isDragging ? "grey-light" : "light"
            }`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="card-header is-align-items-center">
              <p className="card-header-title">
                HU{item.number} - {item.title}
              </p>
              <div className="card-header-icon">
                <button
                  className="button is-small is-link is-outlined is-rounded"
                  onClick={() => setModalState(true, setModal)}
                >
                  <span className="icon is-small">
                    <i className="fa-solid fa-eye"></i>
                  </span>
                  <span>Ver Detalles</span>
                </button>
              </div>
            </div>

            <div className="card-content py-2">
              <progress
                className="progress is-link mb-2"
                value={item.progress.toString()}
                max="100"
              />

              <div className="level mb-0">
                <div className="level-left">
                  <span className="icon-text">
                    <span
                      className={`icon mr-0 has-text-${
                        criticidadStyle[item.criticality]
                      }`}
                    >
                      <i className="fas fa-circle"></i>
                    </span>
                    <span className="is-size-7">{item.criticality}</span>
                  </span>
                </div>

                <div className="level-item">
                  <span className="tag is-primary is-rounded">
                    {item.sprint}
                  </span>
                </div>

                <div className="level-right">
                  <span className="tag is-primary is-rounded">
                    {item.points} Puntos
                  </span>
                </div>
              </div>

              <p className="has-text-weight-medium">Responsables:</p>

              <div className="tags">
                {item.responsables.length ? (
                  item.responsables.map((responsable, index) => (
                    <span
                      className="tag is-light is-primary is-rounded"
                      key={index}
                    >
                      {responsable}
                    </span>
                  ))
                ) : (
                  <span className="tag is-light is-primary is-rounded">
                    Sin Responsables
                  </span>
                )}
              </div>
            </div>
          </article>
        )}
      </Draggable>

      <StoryDetails
        story={item}
        isActive={modalState}
        closeModal={() => setModalState(false, setModal)}
      />
    </>
  );
};

export default CardDraggable;
