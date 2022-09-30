import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  // function capitalizeFirstLetter(str) {
  //   return str[0].toUpperCase() + str.slice(1);
  // }
  return (
    <li className={classes.movie}>
      <h2>{props.name}</h2>
      <h3>{props.strongTo}</h3>
      <p>{props.worstAgainst}</p>
    </li>
  );
};

export default Movie;
