import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useCallback,
} from "react";
import BoardInfo from "../components/Stories/BoardInfo";
import Board from "../components/Stories/Board";
import useFetch from "../hooks/useFetch";
import { getStoriesBySprint, updateStoriesState } from "../services/story";
import { useSelector } from "react-redux";

export const refreshContext = createContext();

const StoriesView = () => {
  const user = useSelector((state) => state.user);
  const settings = useSelector((state) => state.settings);
  const [storiesState, setStories] = useState([]);
  const [filterState, setFilter] = useState();
  const [fetchStories, loadingStories] = useFetch(
    getStoriesBySprint,
    setStories
  );
  const [updateStories] = useFetch(updateStoriesState);

  const fetchStoriesCallback = useCallback(async () => {
    await fetchStories(null, user.team.id);
  }, [fetchStories, user.team.id]);

  useEffect(() => {
    fetchStoriesCallback();
  }, [fetchStoriesCallback]);

  const filterOptions = useMemo(() => {
    const options = new Map([
      ["Backlog", false],
      ["MVP", false],
      ["Sprint 1", false],
      ["Sprint 2", false],
      ["Sprint 3", false],
    ]);

    storiesState.forEach((story) => {
      if (!options.get(story.sprint)) options.set(story.sprint, true);
    });

    return [...options.keys()].reduce((prev, acc) => {
      if (options.get(acc)) return [...prev, acc];
      else return prev;
    }, []);
  }, [storiesState]);

  const onDragEnd = (result) => {
    if (!result.destination || !result.source) return;

    const [sprint, storyId] = result.draggableId.split("-");
    const {
      source: { index: sourceIndex, droppableId: source },
      destination: { index: destIndex, droppableId: dest },
    } = result;

    if (dest === source && destIndex === sourceIndex) return;
    if (dest !== source && !settings.sprints[sprint]) return;

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
      <div className="level">
        <div className="level-left">
          <h1 className="title">Historias de Usuario</h1>
        </div>
        <div className="level-right">
          <div className="buttons has-addons">
            <button className="button is-static">
              <div className="icon is-medium">
                <i className="fas fa-lg fa-filter"></i>
              </div>
            </button>
            <button
              className={`button ${filterState ? "" : "is-primary"}`}
              onClick={() => setFilter(undefined)}
            >
              Todos
            </button>
            {filterOptions.map((option, i) => (
              <button
                className={`button ${
                  filterState === option ? "is-primary" : ""
                }`}
                key={i}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      {user.team.id ? (
        <refreshContext.Provider value={fetchStoriesCallback}>
          <BoardInfo />
          <section className="block">
            {loadingStories ? (
              <progress className="progress is-primary" />
            ) : (
              <Board
                storiesState={storiesState}
                onDragEnd={onDragEnd}
                filter={filterState}
              />
            )}
          </section>
        </refreshContext.Provider>
      ) : (
        <p className="notification">
          Debe pertenecer a un equipo para interactuar con historias de usuario
        </p>
      )}
    </section>
  );
};

export default StoriesView;
