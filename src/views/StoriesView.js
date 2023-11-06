import React from "react";
import BoardInfo from "../components/Stories/BoardInfo";
import Board from "../components/Stories/Board";

const StoriesView = () => {
  return (
    <section className="section">
      <BoardInfo />
      <section className="block">
        <Board
          columns={["Backlog", "Por Hacer", "En Desarrollo", "Completado"]}
        />
      </section>
    </section>
  );
};

export default StoriesView;
