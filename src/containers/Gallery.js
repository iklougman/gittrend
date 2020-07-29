import React, { useEffect, useState, useReducer } from "react";
import { getLastWeekDate, getProjectLangs } from "../utils";
import Card from "./Card";
import { Select } from "antd";
import { isStarred } from "../utils/starHandler";

const ACTIONS = {
  SET_REPOS: "SET_REPOS",
  APPLY_STARFILTER: "APPLY_STARFILTER",
  APPLY_LANGUAGEFILTER: "APPLY_LANGUAGEFILTER",
};
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SET_REPOS:
      return {
        ...state,
        repos: payload,
        languages: getProjectLangs(payload),
      };
    case ACTIONS.APPLY_STARFILTER:
      return { ...state, isStarFilter: payload };
    case ACTIONS.APPLY_LANGUAGEFILTER:
      return { ...state, selectedLanguage: payload };
    default:
      throw new Error();
  }
}

// main gallery
function Gallery({ fetcher }) {
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    repos: [],
    isStarFilter: false,
    selectedLanguage: "All",
    languages: [],
  });

  useEffect(() => {
    // I wrap the call in additional function, because react
    // complaining about useEffect beeing synchnous
    async function fetchData() {
      try {
        const data = await fetcher(getLastWeekDate());
        dispatch({ type: ACTIONS.SET_REPOS, payload: data });
      } catch (e) {
        setError(true);
      }
    }
    fetchData();
  }, [fetcher]);

  const handleLanguageChange = (language) => {
    dispatch({ type: ACTIONS.APPLY_LANGUAGEFILTER, payload: language });
  };

  if (error) {
    return <div data-testid="error-from-api">Service not available</div>;
  }

  if (!state.repos.length) {
    return <div data-testid="no-data-from-api">Loading...</div>;
  }

  return (
    <>
      <div className="gallery-filter-bar">
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.APPLY_STARFILTER,
              payload: !state.isStarFilter,
            })
          }
        >
          {state.isStarFilter ? "\u2605" : "\u2606"}
        </button>
        <Select
          defaultValue="All"
          style={{ width: 120 }}
          onChange={handleLanguageChange}
        >
          <Select.Option value="All">All</Select.Option>
          {state.languages.map((l, key) => (
            <Select.Option value={l} key={key}>
              {l}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="gallery">
        <div className="gallery-main-container">
          {state.repos
            .filter((repo) => (state.isStarFilter ? isStarred(repo.id) : true))
            .filter((repo) => {
              const { language } = repo;
              return state.selectedLanguage !== "All"
                ? language === state.selectedLanguage
                : true;
            })
            .map((repo, i) => (
              <Card key={i} repo={repo} />
            ))}
        </div>
      </div>
    </>
  );
}

export default Gallery;
