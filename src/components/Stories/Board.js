import React, { useMemo } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import StateDroppable from "./StateDroppable";
import { STORY_STATES } from "../../utils/constants";

const Board = ({ storiesState, onDragEnd, filter }) => {
  const storiesByColumn = useMemo(() => {
    const initial = STORY_STATES.reduce((prev, acc) => {
      prev[acc] = [];
      return prev;
    }, {});

    const stories = storiesState
      .filter((story) => story.sprint === filter)
      .reduce((prev, acc) => {
        prev[acc.state].push(acc);
        return prev;
      }, initial);

    Object.keys(stories).forEach((key) => {
      stories[key].sort((a, b) => a.index - b.index);
    });

    return stories;
  }, [storiesState, filter]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="columns">
        {STORY_STATES.map((column) => {
          return (
            <div className="column" key={column}>
              <h2 className="is-size-4">{column}</h2>
              <StateDroppable
                stateItems={storiesByColumn[column]}
                id={column}
              />
            </div>
          );
        })}
      </section>
    </DragDropContext>
  );
};

export default Board;
