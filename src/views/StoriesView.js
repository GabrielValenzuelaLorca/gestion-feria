import React from "react";
import BoardInfo from "../components/Stories/BoardInfo";
import Board from "../components/Stories/Board";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { getStoriesBySprint, updateStoriesState } from "../services/story";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const StoriesView = () => {
  const user = useSelector((state) => state.user);
  const [storiesState, setStories] = useState([]);
  const [fetchStories, loadingStories] = useFetch(
    getStoriesBySprint,
    setStories
  );
  const [updateStories] = useFetch(updateStoriesState);

  useEffect(() => {
    fetchStories("Backlog", user.team.id);
  }, [fetchStories, user.team.id]);

  const onDragEnd = (result) => {
    if (!result.destination || !result.source) return;

    const {
      draggableId: storyId,
      source: { index: sourceIndex, droppableId: source },
      destination: { index: destIndex, droppableId: dest },
    } = result;

    if (dest === source && destIndex === sourceIndex) return;
    const params = {
      sourceStories: [],
      destStories: [],
    };

    setStories((stories) => {
      const newState = [...stories];
      newState.forEach((story, i) => {
        if (story.state === source && story.index > sourceIndex) {
          newState[i].index -= 1;
          params.sourceStories.push(story.id);
        }
      });
      newState.forEach((story, i) => {
        if (story.state === dest && story.index >= destIndex) {
          newState[i].index += 1;
          params.destStories.push(story.id);
        }
      });
      const storyIndex = newState.findIndex((story) => story.id === storyId);
      newState[storyIndex].state = dest;
      newState[storyIndex].index = destIndex;

      params.story = newState[storyIndex];

      return newState;
    });

    updateStories(params);
  };

  return (
    <section className="section">
      <h1 className="title">Historias de Usuario</h1>
      <BoardInfo
        refresh={async () => {
          await fetchStories("Backlog", user.team.id);
        }}
      />
      <section className="block">
        {loadingStories ? (
          <progress className="progress is-primary" />
        ) : (
          <Board storiesState={storiesState} onDragEnd={onDragEnd} />
        )}
      </section>
    </section>
  );
};

export default StoriesView;
