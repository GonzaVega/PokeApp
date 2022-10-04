import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  let content = (
    <li>
      {" "}
      <h2>Pokémon class: {capitalizeFirstLetter(props.name)}</h2>
      <h3 style={{ color: "#AAFF00" }}>Strong against: {props.strongTo}</h3>
      <h3 style={{ color: "#EE6B2F" }}>Weaker against: {props.worstAgainst}</h3>
    </li>
  );
  if (!props.strongTo && !props.worstAgainst) {
    content = (
      <li>
        {" "}
        <h2>Pokémon class: {capitalizeFirstLetter(props.name)}</h2>
        <h4 style={{ color: "white" }}>
          {" "}
          No data available, Proffesor Oak is still researching!
        </h4>
      </li>
    );
  }
  return <div className={classes.movie}>{content} </div>;
};

export default Movie;
