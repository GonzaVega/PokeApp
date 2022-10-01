import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  return (
    <li className={classes.movie}>
      <h2>Pokémon class: {capitalizeFirstLetter(props.name)}</h2>
      {!props.strongTo && !props.worstAgainst && (
        <h4 style={{ color: "white" }}>
          No data available, Proffesor Oak is still researching!
        </h4>
      )}
      <h3 style={{ color: "green" }}>Strong against: {props.strongTo}</h3>
      <h3 style={{ color: "red" }}>Weaker against: {props.worstAgainst}</h3>
    </li>
  );
};

export default Movie;
