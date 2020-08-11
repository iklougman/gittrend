import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Tooltip, Card as AntCard } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { isStarred, starRepo, unStarRepo } from "../utils";
import Meta from "antd/lib/card/Meta";

// Component
const Card = ({ repo = {} }) => {
  const { owner = {} } = repo;
  const {
    id = null,
    full_name = "No name",
    html_url = "",
    stargazers_count = 0,
    language = "-",
    description = "No description",
  } = repo;
  const [userStarred, setUserStarred] = useState(false);
  const hasStar = isStarred(id);
  const handleStarRepo = () => {
    if (isStarred(id)) {
      unStarRepo(id);
    } else {
      starRepo(id);
    }
    setUserStarred(!userStarred);
  };
  const stars = stargazers_count + (isStarred(id) ? 1 : 0);
  return (
    <div>
      <AntCard
        data-testid="repo-card"
        className="repo-card"
        cover={<img alt="example" src={owner.avatar_url} />}
      >
        {Object.keys(repo).length > 0 && (
          <Tooltip title={hasStar ? "unstar" : "give a star"}>
            <Button
              block
              data-testid="star-repo-btn"
              type={hasStar ? "primary" : "secondary"}
              onClick={handleStarRepo}
              icon={hasStar ? <StarFilled /> : <StarOutlined />}
            >
              {stars} Stars
            </Button>
          </Tooltip>
        )}
        <h2>
          <a href={html_url} alt={html_url}>
            {full_name}
          </a>
        </h2>
        <Tooltip placement="bottom" title={description || "-"}>
          <Meta title={description || "-"} />
        </Tooltip>
        <br />
        <Meta description={`Language: ${language}` || "-"} />
        <br />
        <a alt={`star number ${stars}`} href={`${html_url}/stargazers`}>
          <p>Show Stargazers</p>
        </a>
      </AntCard>
    </div>
  );
};

Card.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default Card;
