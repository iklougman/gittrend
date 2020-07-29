import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { isStarred, starRepo, unStarRepo } from "../utils";
import Avatar from "../components/Avatar";

// Component
const Card = ({ repo = {} }) => {
  const { owner = {} } = repo;
  const {
    id = null,
    full_name = "No name",
    html_url = "",
    stargazers_count = 0,
    stargazers_url = "",
    language = "-",
    description = "No description",
  } = repo;
  const [userStarred, setUserStarred] = useState(false);
  const hasStar = isStarred(id);
  const handleStarRepo = useCallback(() => {
    if (isStarred(id)) {
      unStarRepo(id);
    } else {
      starRepo(id);
    }
    // setHasStar(isStarred(id));
    setUserStarred(!userStarred);
  }, [id, userStarred]);
  const stars = stargazers_count + (isStarred(id) ? 1 : 0);
  return (
    <div data-testid="repo-card" className="repo-card-container">
      <Avatar
        url={owner.avatar_url}
        fullName={full_name}
        stars={stars}
        stargazersUrl={stargazers_url}
      />
      <div>
        <h4>
          <a href={html_url} alt={html_url}>
            {full_name}
          </a>
        </h4>
      </div>
      {Object.keys(repo).length > 0 && (
        <div>
          <button data-testid="star-repo-btn" onClick={handleStarRepo}>
            {hasStar ? "\u2605" : "\u2606"}
          </button>
        </div>
      )}

      <div>
        <p>{description || "-"}</p>
      </div>
      <div>
        <small>Language: {language || "-"}</small>
      </div>
    </div>
  );
};

Card.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default Card;
