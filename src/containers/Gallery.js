import React, { useEffect, useState, useReducer } from "react";
import { getLastWeekDate, getProjectLangs } from "../utils";
import Card from "./Card";
import { Select, Button, Tooltip, Col, Row } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { isStarred } from "../utils/starHandler";
import { ALL_LANGUAGES } from "../constants";

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
    selectedLanguage: ALL_LANGUAGES,
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
      <Row className="repo-card-filters">
        <Col>
          <Tooltip
            title={
              state.isStarFilter ? "remove star filter" : "show only starred"
            }
          >
            <Button
              className="filter-item button"
              type={state.isStarFilter ? "primary" : "secondary"}
              onClick={() =>
                dispatch({
                  type: ACTIONS.APPLY_STARFILTER,
                  payload: !state.isStarFilter,
                })
              }
              icon={state.isStarFilter ? <StarFilled /> : <StarOutlined />}
            >
              Filter starred
            </Button>
          </Tooltip>
          <Select
            defaultValue={ALL_LANGUAGES}
            className="filter-item select"
            onChange={handleLanguageChange}
          >
            <Select.Option value={ALL_LANGUAGES}>{ALL_LANGUAGES}</Select.Option>
            {state.languages.map((l, key) => (
              <Select.Option value={l} key={key}>
                {l}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row type="flex" gutter={10} className="repo-card-list">
        {state.repos
          .filter((repo) => (state.isStarFilter ? isStarred(repo.id) : true))
          .filter((repo) => {
            const { language } = repo;
            return state.selectedLanguage !== ALL_LANGUAGES
              ? language === state.selectedLanguage
              : true;
          })
          .map((repo, i) => (
            <Col lg={6} md={8} sm={12} xs={24} className="repo-card-container">
              <Card key={i} repo={repo} />
            </Col>
          ))}
      </Row>
    </>
  );
}

export default Gallery;
