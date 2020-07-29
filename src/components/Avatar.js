import React from "react";

// Avatar component which also shows amount of stars
export default function Avatar({
  url = "",
  fullName = "No name",
  stars = 0,
  stargazersUrl = "",
}) {
  return (
    <div className="avatar-container">
      <img className="avatar-image" src={url} alt={`avatar ${fullName}`}></img>
      <a
        className="star-number"
        alt={`star number ${stars}`}
        href={stargazersUrl}
      >
        <p>{stars} Stars</p>
      </a>
    </div>
  );
}
